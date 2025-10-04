package com.receipt.backend.service;

import com.receipt.backend.dto.CategoryRequest;
import com.receipt.backend.dto.CategoryResponse;
import com.receipt.backend.entity.Category;
import com.receipt.backend.entity.User;
import com.receipt.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Page<CategoryResponse> getUserCategories(Long userId, Pageable pageable) {
        User currentUser = authenticationService.getCurrentUser();
        Page<Category> categories = categoryRepository.findByUserId(currentUser.getId(), pageable);

        return categories.map(category -> {
            CategoryResponse response = CategoryResponse.fromEntity(category);
           //분류별 통계? 등 추가 여지
            return response;
        });
    }
}
