package com.receipt.backend.service;

import com.receipt.backend.dto.StoreListItemResponse;
import com.receipt.backend.dto.StoreRequest;
import com.receipt.backend.dto.StoreResponse;
import com.receipt.backend.entity.Category;
import com.receipt.backend.entity.Item;
import com.receipt.backend.entity.Store;
import com.receipt.backend.entity.User;
import com.receipt.backend.exception.ResourceNotFoundException;
import com.receipt.backend.exception.UnauthorizedException;
import com.receipt.backend.repository.CategoryRepository;
import com.receipt.backend.repository.ItemRepository;
import com.receipt.backend.repository.StoreRepository;
import com.receipt.backend.repository.UserRepository;
import com.receipt.backend.repository.projection.StoreListItemProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class StoreService {
    private final StoreRepository storeRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final AuthenticationService authenticationService;

    public StoreResponse createStore(StoreRequest request) {
        User currentUser = authenticationService.getCurrentUser();

        Store store = Store.builder()
                .purchaseDate(request.getPurchaseDate())
                .name(request.getName())
                .memo(request.getMemo())
                .user(currentUser)
                .build();
        storeRepository.save(store);

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (var itemReq : request.getItems()) {
                Category category = categoryRepository.findById(itemReq.getCategoryId())
                        .orElseThrow(() -> new ResourceNotFoundException("선택한 카테고리 정보가 없습니다"));

                Item item = Item.builder()
                        .name(itemReq.getName())
                        .price(itemReq.getPrice())
                        .quantity(itemReq.getQuantity())
                        .category(category)
                        .store(store)
                        .user(currentUser)
                        .build();

                itemRepository.save(item);
            }
        }

        return toResponse(store);
    }

    public StoreResponse updateStore(Long storeId, StoreRequest request) {
        User currentUser = authenticationService.getCurrentUser();

        Store store = Store.builder()
                .purchaseDate(request.getPurchaseDate())
                .name(request.getName())
                .memo(request.getMemo())
                .user(currentUser)
                .build();
        storeRepository.save(store);


        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (var itemReq : request.getItems()) {
                Category category = categoryRepository.findById(itemReq.getCategoryId())
                        .orElseThrow(() -> new ResourceNotFoundException("선택한 카테고리 정보가 없습니다"));

                Item item = Item.builder()
                        .name(itemReq.getName())
                        .price(itemReq.getPrice())
                        .quantity(itemReq.getQuantity())
                        .category(category)
                        .store(store)
                        .user(currentUser)
                        .build();

                itemRepository.save(item);
            }
        }

        return toResponse(store);
    }


    @Transactional(readOnly = true)
    public List<StoreListItemResponse> listMyStoresItemByMonth(Integer year, Integer month) {
        User currentUser = authenticationService.getCurrentUser();
        YearMonth ym = (year == null || month == null) ? YearMonth.now() : YearMonth.of(year, month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        List<StoreListItemProjection> rows =
                storeRepository.findListForUserByMonth(currentUser.getId(), start, end);

        return rows.stream()
                .map(p -> StoreListItemResponse.builder()
                        .storeId(p.getStoreId())
                        .storeName(p.getStoreName())
                        .memo(p.getMemo())
                        .purchaseDate(p.getPurchaseDate())
                        .itemId(p.getItemId())
                        .itemPrice(p.getItemPrice() == null ? 0 : p.getItemPrice())
                        .itemQuantity(p.getItemQuantity() == null ? 0 : p.getItemQuantity())
                        .itemCount(p.getItemCount() == null ? 0 : p.getItemCount())
                        .totalAmount(p.getTotalAmount() == null ? 0 : p.getTotalAmount())
                        .itemNames(p.getItemNames())
                        .categoryName(p.getCategoryName())
                        .build())
                .toList();
    }



    public void deleteStore(Long storeId) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(()-> new ResourceNotFoundException("해당 상점 정보 없음"));

        User currentUser = authenticationService.getCurrentUser();

        if(!store.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("해당 상점의 회원 정보와 불일치");
        }

        storeRepository.deleteById(storeId);
    }

    private StoreResponse toResponse(Store store) {
        List<com.receipt.backend.dto.ItemResponse> itemResponses =
                store.getItems() == null ? List.<com.receipt.backend.dto.ItemResponse>of() :
                        store.getItems().stream()
                                .map(item -> com.receipt.backend.dto.ItemResponse.builder()
                                        .id(item.getId())
                                        .name(item.getName())
                                        .price(item.getPrice())
                                        .quantity(item.getQuantity())
                                        .categoryId(item.getCategory().getId())
                                        .categoryName(item.getCategory().getName())
                                        .createdAt(item.getCreatedAt())
                                        .updatedAt(item.getUpdatedAt())
                                        .build())
                                .toList();

        return com.receipt.backend.dto.StoreResponse.builder()
                .id(store.getId())
                .purchaseDate(store.getPurchaseDate())
                .name(store.getName())
                .memo(store.getMemo())
                .items(itemResponses)
                .build();
    }
}
