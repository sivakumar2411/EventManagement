package com.backend.backend.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Event;
import com.backend.backend.Model.Manager;
import com.backend.backend.Model.Participants;
import com.backend.backend.Model.User;
import com.backend.backend.Repository.EventRepo;
import com.backend.backend.Repository.ManagerRepo;
import com.backend.backend.Repository.UserRepo;

@Service
public class EventService 
{
    @Autowired
    EventRepo ER;

    @Autowired
    ParticipantService PS;

    @Autowired
    UserService US;

    @Autowired
    UserRepo UR;

    @Autowired
    ManagerRepo MR;

    public void PostNewEvent(Event E,int id)
    {
        User U = UR.findById(id);
        E.setOrganiser(U);
        ER.save(E);
    }

    public void UpdateEvent(Event E)
    {
        ER.save(E);
    }

    public List<Event> getAllEvents()
    {
        List<Event> E = ER.findAll();
        if(E != null)
        for(Event e : E)
        {
            Manager m = e.getManager();
            if(m != null)
            {
                m.setEvents(null);
                e.setManager(m);
            }
            User u = e.getOrganiser();
            u.setEventsOrganised(null);
            e.setOrganiser(u);
            List<Participants> P = e.getParticipants();
            if(P != null)
            {
                for(Participants p:P)
                {
                    p.setEvent(null);
                    User u1 = p.getUser();
                    u1.setParticipatedEvent(null);
                    u1.setEventsOrganised(null);
                    u1.setManager(null);
                    p.setUser(u1);
                }
                e.setParticipants(P);
            }
        }
        return E;
    }

    public Event getEventById(int id){
        Event e = ER.findById(id);
        Manager m = e.getManager();
        if(m != null)
        {
            m.setEvents(null);
            e.setManager(m);
        }
        User u = e.getOrganiser();
        u.setEventsOrganised(null);
        e.setOrganiser(u);
        List<Participants> P = e.getParticipants();
            if(P != null)
            {
                for(Participants p:P)
                {
                    p.setEvent(null);
                    User u1 = p.getUser();
                    u1.setParticipatedEvent(null);
                    u1.setEventsOrganised(null);
                    u1.setManager(null);
                    p.setUser(u1);
                }
                e.setParticipants(P);
            }
        return e;
    }

    public List<Event> getPublicOGEvents()
    {
        List<Event> E = ER.getPublicOGEvents();
        if(E == null)
        return E;
        for(Event e : E)
        {
            Manager m = e.getManager();
            if(m != null)
            {
                m.setEvents(null);
                e.setManager(m);
            }
            User u = e.getOrganiser();
            u.setEventsOrganised(null);
            e.setOrganiser(u);
            List<Participants> P = e.getParticipants();
                if(P != null)
                {
                    for(Participants p:P)
                    {
                        p.setEvent(null);
                        User u1 = p.getUser();
                        u1.setParticipatedEvent(null);
                        u1.setEventsOrganised(null);
                        u1.setManager(null);
                        p.setUser(u1);
                    }
                    e.setParticipants(P);
                }
        }
        return E;
    }
    public List<Event> getPublicComEvents()
    {
        List<Event> E = ER.getPublicComEvents();
        if(E == null)
        return E;
        for(Event e : E)
        {
            Manager m = e.getManager();
            if(m != null)
            {
                m.setEvents(null);
                e.setManager(m);
            }
            User u = e.getOrganiser();
            u.setEventsOrganised(null);
            e.setOrganiser(u);
            List<Participants> P = e.getParticipants();
            if(P != null)
            {
                for(Participants p:P)
                {
                    p.setEvent(null);
                    User u1 = p.getUser();
                    u1.setParticipatedEvent(null);
                    u1.setEventsOrganised(null);
                    u1.setManager(null);
                    p.setUser(u1);
                }
                e.setParticipants(P);
            }
        }
        return E;
    }

    public List<Event> getByFee(double a)
    {
        List<Event> E = ER.getEventsByFee(a);
        if(E == null)
        return E;
        for(Event e : E)
        {
            Manager m = e.getManager();
            if(m != null)
            {
                m.setEvents(null);
                e.setManager(m);
            }
            User u = e.getOrganiser();
            u.setEventsOrganised(null);
            e.setOrganiser(u);
            List<Participants> P = e.getParticipants();
            if(P != null)
            {
                for(Participants p:P)
                {
                    p.setEvent(null);
                    User u1 = p.getUser();
                    u1.setParticipatedEvent(null);
                    u1.setEventsOrganised(null);
                    u1.setManager(null);
                    p.setUser(u1);
                }
                e.setParticipants(P);
            }
        }
        return E;
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

    // public List<Event> getByAttribute(String a,String value)
    // {
    //     if(a.toLowerCase().contains("select") || a.toLowerCase().contains("event") || a.toLowerCase().contains("from") || a.toLowerCase().contains(";"))
    //     return null;

    //     List<Event> E = ER.getByAttribute(a,value);
    //     if(E == null)
    //     return E;
    //     for(Event e : E)
    //     {
    //         Manager m = e.getManager();
    //         if(m != null)
    //         {
    //             m.setEvents(null);
    //             e.setManager(m);
    //         }
    //         User u = e.getOrganiser();
    //         u.setEventsOrganised(null);
    //         e.setOrganiser(u);
    //     }
    //     return E;
    // }

    public List<User> getAllParticipants(int id)
    {
        List<User> U = PS.getAllParticipants(id);
        // if(U != null)
        // for(User u:U)
        // u.setParticipatedEvents(null);
        return U;
    }

    public List<Event> getAllEventsByParticipantId(int id)
    {
        List<Event> E = PS.getEventsByParticipant(id);
        if(E != null)
        for(Event e:E)
        {
            User U = e.getOrganiser();
            U.setEventsOrganised(null);
            e.setOrganiser(U);
        }
        return E;
    }

    public List<Event> getAllEventsByMana(int id)
    {
        List<Event> E = ER.getEventsByManager(id);
        if(E == null)
        return E;
        for(Event e : E)
        {
            e.setManager(null);
            User u = e.getOrganiser();
            u.setEventsOrganised(null);
            e.setOrganiser(u);
            List<Participants> P = e.getParticipants();
            if(P != null)
            {
                for(Participants p:P)
                {
                    p.setEvent(null);
                    User u1 = p.getUser();
                    u1.setParticipatedEvent(null);
                    u1.setEventsOrganised(null);
                    u1.setManager(null);
                    p.setUser(u1);
                }
                e.setParticipants(P);
            }
        }
        return E;
    }

    public List<Event> getAllEventsByOrgan(int id)
    {
        List<Event> E = ER.getEventsByOrganiser(id);
        if(E == null)
        return E;
        for(Event e : E)
        {
            e.setOrganiser(null);
            Manager M = e.getManager();
            if(M != null)
            {
                M.setEvents(null);
                e.setManager(M);
            }
            List<Participants> P = e.getParticipants();
            if(P != null)
            {
                for(Participants p:P)
                {
                    p.setEvent(null);
                    User u1 = p.getUser();
                    u1.setParticipatedEvent(null);
                    u1.setEventsOrganised(null);
                    u1.setManager(null);
                    p.setUser(u1);
                }
                e.setParticipants(P);
            }
        }
        return E;
    }

    public List<Event> getManaNeedEvents()
    {

        List<Event> E = ER.getManaNeedEvents();
        if(E == null)
        return E;
        for(Event e:E)
        {
            User u = e.getOrganiser();
            u.setEventsOrganised(null);
            e.setOrganiser(u);
        }
        return E;
    }

    public void UpdateStatus(int id,int mid,String a)
    {
        Event E = ER.findById(id);
        E.setStatus(a);
        if(mid != -1)
        {
            Manager M = MR.findById(mid);
            E.setManager(M);
        }
        ER.save(E);
    }

    public void NewParticipant(int eid,int uid)
    {
        Event E = ER.findById(eid);
        List<Participants> P =E.getParticipants();
        if(P == null)
        P = new ArrayList<Participants>();
        Participants p = new Participants();
        p.setEvent(E);
        p.setUser(UR.findById(uid));
        P.add(p);
        E.setParticipants(P);
        ER.save(E);
    }

    // public User getOrganiser(int id)
    // {
    //     Event E = ER.findById(id);
    //     User U = null;
    //     return U;
    // }

}
