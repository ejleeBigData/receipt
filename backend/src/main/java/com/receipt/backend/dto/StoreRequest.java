package com.receipt.backend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreRequest {
    private String name;
    private String memo;

    private List<ItemRequest> items;
}
