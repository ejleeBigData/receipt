package com.receipt.backend.repository;


import com.receipt.backend.entity.Store;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    @EntityGraph(attributePaths = {"user", "items", "items.category"})
    @Query("SELECT s FROM Store s WHERE s.user.id = :userId ORDER BY s.createdAt DESC")
    List<Store> findByUserIdWithItems(@Param("userId") Long userId);

    boolean existsByNameAndUserId(String name, Long userId);
}
