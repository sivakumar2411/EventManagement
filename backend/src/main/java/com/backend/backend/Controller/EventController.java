package com.backend.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Model.Event;
import com.backend.backend.Model.User;
import com.backend.backend.Service.EventService;


@RestController
@RequestMapping("/Events")
public class EventController 
{
    @Autowired
    EventService ES;

    @PostMapping("/InsertNew/{id}")
    public ResponseEntity<String> PostEvent(@RequestBody Event E,@PathVariable int id)
    {
        try{
            ES.PostNewEvent(E,id);
            return new ResponseEntity<>("Event Created",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
        return new ResponseEntity<>("Failed in EventCreation"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/UpdateEvent")
    public ResponseEntity<String> UpdateEvent(@RequestBody Event E)
    {
        try{
            ES.UpdateEvent(E);
            return new ResponseEntity<>("Updated",HttpStatus.OK);
        }
        catch(Exception e){
        return new ResponseEntity<>("Update Failed",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/NewParticipant/{eid}/{uid}")
    public ResponseEntity<String> NewParticipant(@PathVariable int eid,@PathVariable int uid)
    {
        try{
            ES.NewParticipant(eid,uid);
            return new ResponseEntity<>("Succesfully Joined in Event",HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Failed to Join in Event"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetAll")
    public ResponseEntity<List<Event>> getAllEvents()
    {
        try{
            return new ResponseEntity<>(ES.getAllEvents(),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetEventById/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable int id)
    {
        try{
            return new ResponseEntity<>(ES.getEventById(id),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetPublicOGEvents")
    public ResponseEntity<List<Event>> getPublicOGEvents()
    {
        try{
            return new ResponseEntity<>(ES.getPublicOGEvents(),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetPublicComEvents")
    public ResponseEntity<List<Event>> getPublicComEvents()
    {
        try{
            return new ResponseEntity<>(ES.getPublicComEvents(),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetEventsByFee/{a}")
    public ResponseEntity<List<Event>> getFreeEvents(@PathVariable double a)
    {
        try{
            return new ResponseEntity<>(ES.getByFee(a),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @GetMapping("/GetEventsByPlace/{a}")
    // public ResponseEntity<List<Event>> getEventsByPlace(@PathVariable String a)
    // {
    //     try{
    //         return new ResponseEntity<>(ES.getByPlace(a),HttpStatus.OK);
    //     }
    //     catch(Exception e){
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @GetMapping("/GetEvetsBy/{}/{a}")
    // public ResponseEntity<List<Event>> getEventsByStatus(@PathVariable String a)
    // {
    //     try{
    //         return new ResponseEntity<>(ES.getByStatus(a),HttpStatus.OK);
    //     }
    //     catch(Exception e){
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @GetMapping("/GetEventsBy/{attribute}/{value}")
    // public ResponseEntity<List<Event>> getEventsByAttribute(@PathVariable String attribute,@PathVariable String value)
    // {
    //     try{
    //         return new ResponseEntity<>(ES.getByAttribute(attribute,value), HttpStatus.OK);
    //     }
    //     catch(Exception e){
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    @GetMapping("/GetParticipants/{id}")
    public ResponseEntity<List<User>> getAllParticipants(@PathVariable int id)
    {
        try{
            return new ResponseEntity<>(ES.getAllParticipants(id),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetEventsByParticipant/{id}")
    public ResponseEntity<List<Event>> getEventsByParticipant(@PathVariable int id)
    {
        try{
            return new ResponseEntity<>(ES.getAllEventsByParticipantId(id), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/GetEventsByManager/{a}")
    public ResponseEntity<List<Event>> getEventsByManager(@PathVariable int a)
    {
        try{
            return new ResponseEntity<>(ES.getAllEventsByMana(a),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }   
    }

    @GetMapping("/GetEventsByOrganiser/{a}")
    public ResponseEntity<List<Event>> getEventsByOrganiser(@PathVariable int a)
    {
        try{
            return new ResponseEntity<>(ES.getAllEventsByOrgan(a),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }   
    }
    

    @GetMapping("/GetManagerNeedEvents")
    public ResponseEntity<List<Event>> getManaNeedEvents()
    {
        try{
            return new ResponseEntity<>(ES.getManaNeedEvents(), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/UpdateStatus/{id}/{mid}/{status}")
    public ResponseEntity<String> UpdateStatus(@PathVariable int id,@PathVariable int mid,@PathVariable String status)
    {
        try{
            ES.UpdateStatus(id,mid,status);
            return new ResponseEntity<>("Status Updated",HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>("Failed in Status Update",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
