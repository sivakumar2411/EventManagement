package com.backend.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.backend.Model.User;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {

    User findById(int id);

    @Query("Select U from User U where U.mana = true")
    public List<User> getAllManagers();

    @Query("SELECT count(U) FROM User U WHERE U.email = :email or U.uname = :uname")
    int emailuserExist(String email, String uname);

    @Query("Select U from User U where U.email = :a")
    public User getUserByEmail(String a);

    @Query("SELECT U FROM User U WHERE U.email = :a or U.uname = :a")
    User getByUNorEM(String a);

    @Query("select U from User U where U.manager.accept = false")
    public List<User> getUnacceptedManagers();
    
}
