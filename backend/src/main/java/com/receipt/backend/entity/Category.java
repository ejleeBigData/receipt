package com.receipt.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "categories",
        indexes = {
                @Index(name = "idx_categories_user_id", columnList = "user_id"),
                @Index(name = "idx_categories_user_sort", columnList = "user_id, sort")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_categories_user_name", columnNames = {"user_id", "name"})
        }
)
@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@ToString(exclude = "user")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@EntityListeners(AuditingEntityListener.class)
@Check(constraints = "sort >= 0 AND (cut IS NULL OR cut >= 0)")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Builder.Default
    @Column(nullable = false)
    private Integer sort = 0;

    @Builder.Default
    @Column(nullable = false)
    private boolean accrue = false;

    @Column(precision = 12, scale = 0)
    private BigDecimal cut;

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
