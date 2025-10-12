package com.receipt.backend.repository;


import com.receipt.backend.dto.StoreListItemResponse;
import com.receipt.backend.entity.Store;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    @EntityGraph(attributePaths = {"user", "items", "items.category"})
    @Query("SELECT s FROM Store s WHERE s.user.id = :userId ORDER BY s.createdAt DESC")
    List<Store> findByUserIdWithItems(@Param("userId") Long userId);

    @Query("SELECT s FROM Store s WHERE s.user.id = :userId " +
    " ORDER BY s.purchaseDate DESC, s.createdAt DESC " )
    List<Store> findByUserOrderByPurchaseDate(@Param("userId") Long userId);


    @EntityGraph(attributePaths = {"user"})
    @Query("""
      SELECT new com.receipt.backend.dto.StoreListItemResponse(
        s.id,
        s.name,
        s.memo,
        s.purchaseDate,
        COALESCE(COUNT(i), 0),
        COALESCE(SUM(i.price * i.quantity), 0),
        CASE WHEN COUNT(i) > 0 THEN MIN(i.name) ELSE NULL END
      )
      FROM Store s
      LEFT JOIN s.items i
      WHERE s.user.id = :userId
        AND s.purchaseDate BETWEEN :startDate AND :endDate
      GROUP BY s.id, s.name, s.memo, s.purchaseDate
      ORDER BY s.purchaseDate DESC, s.id DESC
    """)
    List<StoreListItemResponse> findListForUserByMonth(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    boolean existsByUser_IdAndName(Long userId, String name);
}
