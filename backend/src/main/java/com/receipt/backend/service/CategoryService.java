package com.receipt.backend.service;

import com.receipt.backend.dto.CategoryRequest;
import com.receipt.backend.dto.CategoryResponse;
import com.receipt.backend.entity.Category;
import com.receipt.backend.entity.User;
import com.receipt.backend.exception.ResourceNotFoundException;
import com.receipt.backend.exception.UnauthorizedException;
import com.receipt.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final AuthenticationService authenticationService;

    public CategoryResponse createCategory(CategoryRequest request) {
        User currentUser = authenticationService.getCurrentUser();

        Category category = Category.builder()
                .name(request.getName())
                .sort(request.getSort())
                .accrue(request.isAccrue())
                .cut(request.getCut())
                .user(currentUser)
                .build();

        category = categoryRepository.save(category);
        return CategoryResponse.fromEntity(category);
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getUserCategories() {
        User currentUser = authenticationService.getCurrentUser();
        List<Category> categories = categoryRepository.findAllByUserIdOrderBySortAscNameAsc(currentUser.getId());

        return categories.stream()
                .map(CategoryResponse::fromEntity)
                .toList();// JDK 17 기준
    }

    public CategoryResponse updateCategory(Long categoryId, CategoryRequest request) {
        User currentUser = authenticationService.getCurrentUser();

        Category category =  categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("카테고리 정보 없음"));

        if (!category.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("해당 카테고리의 회원정보와 불일치");
        }

        final String name = request.getName() == null ? null : request.getName().trim();
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("카테고리 명칭은 비어 있을 수 없습니다.");
        }

        // 동일 이름으로 변경 시 자기 자신 제외한 중복 체크(선택)
        if (!name.equalsIgnoreCase(category.getName())
                && categoryRepository.existsByUserIdAndNameIgnoreCase(currentUser.getId(), name)) {
            throw new IllegalStateException("이미 존재하는 카테고리입니다.");
        }

        category.setName(name);
        category.setSort(request.getSort());
        category.setAccrue(request.isAccrue());
        category.setCut(request.getCut());

        // by ChatGPY : 더티체킹으로 자동 update; save 호출 불필요
        // categoryRepository.save(category);

        log.info("[CategoryService] updateCategory: userId={}, categoryId={}", currentUser.getId(), category.getId());
        return CategoryResponse.fromEntity(category);
    }

    public void deleteCategory(Long categoryId) {
        User currentUser = authenticationService.getCurrentUser();
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->  new ResourceNotFoundException("카테고릴 정보 없음"));

        if (!category.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("해당 카테고리의 회원정보와 불일치");
        }

        //하위 데이터 먼저 삭제??
        categoryRepository.deleteById(categoryId);
    }
}