package com.receipt.backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreResponse {
    private Long id;
    private String name;
    private String memo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<ItemResponse> items;
    private List<CategoryResponse> categories;
}
