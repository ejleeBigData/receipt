package com.receipt.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "items",
        indexes = {
                @Index(name = "idx_items_user_id", columnList = "user_id"),
                @Index(name = "idx_items_category_id", columnList = "category_id"),
                @Index(name = "idx_items_store_id", columnList = "store_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"user","category","store"})
@Check(constraints = "price >= 0 AND quantity >= 1")
public class Item {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, length = 200)
        private String name;

        // 통화 단위가 KRW 라면 정수(Long)로도 OK. 소수 필요하면 BigDecimal(precision/scale) 사용
        @Column(nullable = false)
        private Long price;

        @Column(nullable = false)
        private Long quantity;

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "category_id", nullable = false)
        private Category category;

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "store_id", nullable = false)
        private Store store;

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        @CreationTimestamp
        @Column(name = "created_at", updatable = false, nullable = false)
        private LocalDateTime createdAt;

        @UpdateTimestamp
        @Column(name = "updated_at")
        private LocalDateTime updatedAt;
}
