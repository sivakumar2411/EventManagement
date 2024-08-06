package com.backend.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Model.Manager;
import com.backend.backend.Service.ManagerService;

@RestController
@RequestMapping("/Managers")
public class ManagerController 
{

    @Autowired
    ManagerService MS;

    @PostMapping("/InsertNew")
    public ResponseEntity<String> postNewMana(@RequestBody Manager M)
    {
        try{
            MS.PostNewManager(M);
            return new ResponseEntity<>("Submitted successfully",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
            return new ResponseEntity<>("Submission Failed",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/UpdateManager")
    public ResponseEntity<String> updateManager(@RequestBody Manager M)
    {
        try{
            MS.UpdateManager(M);
            return new ResponseEntity<>("Updated successfully",HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Update Failed",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/DeleteById/{id}")
    public ResponseEntity<String> deleteManager(@PathVariable int id)
    {
        try{
            MS.DeleteManager(id);
            return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Deletion Failed",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetReqs")
    public ResponseEntity<List<Manager>> getReqs()
    {
        try{
            return new ResponseEntity<>(MS.getRequests(),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetById/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable int id)
    {
        try{
            return new ResponseEntity<>(MS.getManagerById(id),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetAll")
    public ResponseEntity<List<Manager>> getAllManagers()
    {
        try{
            return new ResponseEntity<>(MS.getAllManagers(),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
