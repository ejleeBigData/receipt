package com.receipt.backend.repository;

import com.receipt.backend.entity.Store;
import com.receipt.backend.repository.projection.StoreListItemProjection;
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


    @Query(value = """
        WITH agg AS (
          SELECT
            s.id                                   AS store_id,
            s.user_id                              AS user_id,
            s.name                                 AS store_name,
            s.memo                                 AS memo,
            s.purchase_date                        AS purchase_date,
            COUNT(i.id)                            AS item_count,
            COALESCE(SUM(i.price * i.quantity),0)  AS total_price,
            MIN(i.id)                              AS first_item_id,
            MIn(i.name)                            AS first_item_name
          FROM stores s
          LEFT JOIN items i ON i.store_id = s.id
          WHERE s.user_id = :userId
            AND s.purchase_date BETWEEN :startDate AND :endDate
          GROUP BY s.id, s.user_id, s.name, s.memo, s.purchase_date
        )
        SELECT
          a.store_id       AS "storeId",
          a.store_name     AS "storeName",
          a.memo           AS "memo",
          a.purchase_date  AS "purchaseDate",
          a.item_count     AS "itemCount",
          a.total_price    AS "totalAmount",
          CASE
            WHEN a.item_count = 0 THEN NULL
            WHEN a.item_count = 1 THEN a.first_item_name
            ELSE a.first_item_name || ' 외 ' || (a.item_count - 1) || '건'
          END              AS "itemNames",
          c.name           AS "categoryName",
          fi.id            AS "itemId" ,
          fi.price          AS "itemPrice" ,
          fi.quantity      AS "itemQuantity"
        FROM agg a
        LEFT JOIN items fi ON fi.id = a.first_item_id
        LEFT JOIN categories c ON c.id = fi.category_id
        ORDER BY a.purchase_date DESC, a.store_id DESC
        """,
            nativeQuery = true)
    List<StoreListItemProjection> findListForUserByMonth(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    boolean existsByUser_IdAndName(Long userId, String name);
}
