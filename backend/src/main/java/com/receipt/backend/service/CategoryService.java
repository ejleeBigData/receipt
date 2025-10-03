package com.receipt.backend.service;

import com.receipt.backend.dto.CategoryRequest;
import com.receipt.backend.dto.CategoryResponse;
import com.receipt.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        
    }
}
