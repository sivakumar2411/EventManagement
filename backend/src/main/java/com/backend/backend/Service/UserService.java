package com.backend.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.User;
import com.backend.backend.Repository.UserRepo;

@Service
public class UserService 
{

    @Autowired
    UserRepo UR;

    public int PostNewUser(User U)
    {
        int a = UR.emailuserExist(U.getEmail(), U.getUname());
        if(a == 1)
        return 1;
        UR.save(U);
        return 0;
    }

    public void updateUser(User U)
    {
        UR.save(U);
    }

    public User getUserById(int id){
        return UR.findById(id);
    }

    public void deleteUser(int id)
    {
        UR.deleteById(id);
    }

    public List<User> getAllUsers()
    {
        return UR.findAll();
    }

    public List<User> getAllManagers()
    {
        return UR.getAllManagers();
    }

    public User LoginUser(String a,String b)
    {
        if(a.toLowerCase().contains("select") || a.toLowerCase().contains("user") || a.toLowerCase().contains("from") || a.toLowerCase().contains(";") || b.toLowerCase().contains(";") || b.toLowerCase().contains("select") || b.toLowerCase().contains("user") || b.toLowerCase().contains("from"))
        return null;
        
        User u = UR.getUserByEmail(a, b);
        if(u == null)
        u = UR.getUserByUserName(a, b);

        return u;

    }

    public List<User> getUnacceptedManagers()
    {
        return UR.getUnacceptedManagers();
    }

}
