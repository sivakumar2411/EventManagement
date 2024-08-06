package com.backend.backend.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Model.User;
import com.backend.backend.Service.UserService;

@RestController
@RequestMapping("/Users")
public class UserController 
{

    @Autowired
    UserService US;

    @PostMapping("/InsertNew")
    public ResponseEntity<String> postNewUser(@RequestBody User U)
    {
        try{
            int a = US.PostNewUser(U);
            if(a == 1)
            return new ResponseEntity<>("UserName/Email Already Exist", HttpStatus.OK);
            return new ResponseEntity<>("Signed Up", HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>("Signed Up Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/UpdateUser/{id}")
    public ResponseEntity<String> UpdateUser(@PathVariable int id,@RequestBody User U)
    {
        try{
            US.updateUser(U);
            return new ResponseEntity<>("Updated", HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Updation Failed",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/DeleteById/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id)
    {
        try{
            US.deleteUser(id);
            return new ResponseEntity<>("Deleted successfully", HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Deletion Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetAll")
    public ResponseEntity<List<User>> getAllUsers()
    {
        try{
            return new ResponseEntity<>(US.getAllUsers(), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id)
    {
        try{
            return new ResponseEntity<>(US.getUserById(id), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/LogIn/{a}/{b}")
    public ResponseEntity<User> LogIn(@PathVariable String a,@PathVariable String b)
    {
        try{
            return new ResponseEntity<>(US.LoginUser(a, b),HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetReqs")
    public ResponseEntity<List<User>> getManaReqs()
    {
        try{
            return new ResponseEntity<>(US.getUnacceptedManagers(), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
