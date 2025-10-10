package com.receipt.backend.service;

import com.receipt.backend.dto.StoreRequest;
import com.receipt.backend.dto.StoreResponse;
import com.receipt.backend.entity.Category;
import com.receipt.backend.entity.Item;
import com.receipt.backend.entity.Store;
import com.receipt.backend.entity.User;
import com.receipt.backend.exception.ResourceNotFoundException;
import com.receipt.backend.repository.CategoryRepository;
import com.receipt.backend.repository.ItemRepository;
import com.receipt.backend.repository.StoreRepository;
import com.receipt.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .name(store.getName())
                .memo(store.getMemo())
                .createdAt(store.getCreatedAt())
                .updatedAt(store.getUpdatedAt())
                .items(itemResponses)
                .build();
    }



}
