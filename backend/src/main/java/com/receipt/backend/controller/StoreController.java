package com.receipt.backend.controller;

import com.receipt.backend.dto.StoreListItemResponse;
import com.receipt.backend.dto.StoreRequest;
import com.receipt.backend.dto.StoreResponse;
import com.receipt.backend.service.CategoryService;
import com.receipt.backend.service.StoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {
    private final CategoryService categoryService;
    private final StoreService storeService;


    @PostMapping
    public ResponseEntity<StoreResponse> createStore(@Valid @RequestBody StoreRequest request) {
        StoreResponse response = storeService.createStore(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public List<StoreListItemResponse> listMyStoresItemByMonth(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month
    ) {
        return storeService.listMyStoresItemByMonth(year, month);
    }
}
