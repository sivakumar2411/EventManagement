package com.backend.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.backend.Model.Manager;


@Repository
public interface ManagerRepo extends JpaRepository<Manager,Integer> {

    Manager findById(int id);

    @Query("Select M from Manager M where M.accept = false")
    List<Manager> getRequests();


    @Query("Select M from Manager M where M.accept = true")
    List<Manager> findAllManagers();

    
}
