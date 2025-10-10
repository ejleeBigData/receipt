package com.receipt.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemRequest {
    private String name;
    private Long price;
    private Long quantity;
    private Long userId;
    private Long categoryId;
    private Long storeId;
}
