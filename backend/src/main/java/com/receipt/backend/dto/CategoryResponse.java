package com.receipt.backend.dto;


import com.receipt.backend.entity.Category;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;
    private Integer sort;
    private boolean accrue;
    private BigDecimal cut;
    private UserDto user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static CategoryResponse fromEntity(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .sort(Objects.requireNonNullElse(category.getSort(), 0))
                .accrue(category.isAccrue())
                .cut(category.getCut())
                .user(UserDto.fromEntity(category.getUser()))
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
}
