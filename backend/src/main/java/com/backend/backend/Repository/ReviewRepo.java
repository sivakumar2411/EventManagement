package com.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.Model.Review;

@Repository
public interface ReviewRepo extends JpaRepository<Review,Integer>{

    
}
