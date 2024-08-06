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

    @PostMapping("/InsertNew")
    public ResponseEntity<String> PostNewUser(@RequestBody Event E)
    {
        try{
            ES.PostNewEvent(E);
            return new ResponseEntity<>("Event Created",HttpStatus.ACCEPTED);
        }
        catch(Exception e){
        return new ResponseEntity<>("Failed in EventCreation",HttpStatus.INTERNAL_SERVER_ERROR);
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

    @GetMapping("/GetPublicEvents")
    public ResponseEntity<List<Event>> getPublicEvents()
    {
        try{
            return new ResponseEntity<>(ES.getPublicEvents(),HttpStatus.OK);
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

    @GetMapping("/GetEventsBy/{attribute}/{value}")
    public ResponseEntity<List<Event>> getEventsByAttribute(@PathVariable String attribute,@PathVariable String value)
    {
        try{
            return new ResponseEntity<>(ES.getByAttribute(attribute,value), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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

}
