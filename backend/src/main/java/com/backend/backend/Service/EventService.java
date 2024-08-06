package com.backend.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Event;
import com.backend.backend.Model.User;
import com.backend.backend.Repository.EventRepo;

@Service
public class EventService 
{
    @Autowired
    EventRepo ER;

    @Autowired
    ParticipantService PS;

    public void PostNewEvent(Event E)
    {
        ER.save(E);
    }

    public void UpdateEvent(Event E)
    {
        ER.save(E);
    }

    public List<Event> getAllEvents()
    {
        return ER.findAll();
    }

    public Event getEventById(int id){
        return ER.findById(id);
    }

    public List<Event> getPublicEvents()
    {
        return ER.getPublicEvents();
    }

    public List<Event> getByFee(double a)
    {
        return ER.getEventsByFee(a);
    }

    // public List<Event> getByPlace(String a)
    // {
    //     List<Event> E = ER.findAll();

    //     for(Event e:E)
    //     if(!e.getPlace().toLowerCase().contains(a))
    //     E.remove(e);
    //     return E;
    // }

    // public List<Event> getByStatus(String a)
    // {
    //     return ER.getByStatus(a);
    // }

    public List<Event> getByAttribute(String a,String value)
    {
        if(a.toLowerCase().contains("select") || a.toLowerCase().contains("event") || a.toLowerCase().contains("from") || a.toLowerCase().contains(";"))
        return null;

        return ER.getByAttribute(a,value);
    }

    public List<User> getAllParticipants(int id)
    {
        return PS.getAllParticipants(id);
    }

    public List<Event> getAllEventsByMana(int id)
    {
        return ER.getEventsByManager(id);
    }

    // public User getOrganiser(int id)
    // {
    //     Event E = ER.findById(id);
    //     User U = null;
    //     return U;
    // }

}
