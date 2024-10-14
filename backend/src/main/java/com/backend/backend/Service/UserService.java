package com.backend.backend.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Event;
import com.backend.backend.Model.Manager;
import com.backend.backend.Model.Participants;
import com.backend.backend.Model.User;
import com.backend.backend.Repository.ManagerRepo;
import com.backend.backend.Repository.UserRepo;
import com.backend.backend.Utils.Encryption;

@Service
public class UserService 
{

    @Autowired
    UserRepo UR;

    @Autowired
    ManagerRepo MR;

    @Autowired
    Encryption ECR;

    public int PostNewUser(User U)
    {
        int a = UR.emailuserExist(U.getEmail(), U.getUname());
        if(a == 1)
        return 1;
        U.setPassword(ECR.encrypt(U.getPassword()));
        UR.save(U);
        return 0;
    }

    public void updateUser(User U)
    {
        User u = UR.findById((int)U.getId());
        U.setEventsOrganised(u.getEventsOrganised());
        U.setManager(u.getManager());
        U.setParticipatedEvent(u.getParticipatedEvent());
        UR.save(U);
    }

    public void UpdateForManager(User U)
    {
        User u = UR.findById((int)U.getId());
        U.setEventsOrganised(u.getEventsOrganised());
        U.setParticipatedEvent(u.getParticipatedEvent());
        UR.save(U);
    }

    // public void UpdateForOrganisation(User U)
    // {
    //     User u = UR.findById((int)U.getId());
    //     List<Event> E = u.getEventsOrganised();
    //     E.add();
    //     U.setEventsOrganised(E);
    //     UR.save(U);
    // }

    List<Event> getEventsWithSomeRestric(List<Event> E)
    {
        if(E != null)
        for(Event e:E)
        {
            Manager M = e.getManager();
            if(M != null)
            {
                M.setEvents(null);
                e.setManager(M);
            }
            e.setParticipants(null);
            e.setOrganiser(null);
        }
        return E;
    }

    List<Participants> getParticipantsWithSomeRes(List<Participants> P)
    {
        for(Participants p:P)
        {
            p.setUser(null);
            Event E = p.getEvent();
            List<Event> e = new ArrayList<>();
            e.add(E);
            e = getEventsWithSomeRestric(e);
            p.setEvent(e.get(0));
        }
        return P;
    }

    public User getUserById(int id){
        User u = UR.findById(id);
        if(u != null)
        {
            Manager M = u.getManager();
            if(M != null)
            {
                List<Event> E = M.getEvents();
                if(E != null)
                {
                    for(Event e:E)
                    {
                        e.setManager(null);
                        e.setParticipants(null);
                        User u1 = e.getOrganiser();
                        u1.setEventsOrganised(null);
                        e.setOrganiser(u1);
                    }
                    M.setEvents(E);
                }
            }
            u.setEventsOrganised(getEventsWithSomeRestric(u.getEventsOrganised()));
            u.setParticipatedEvent(getParticipantsWithSomeRes(u.getParticipatedEvent()));
        }
        return u;
    }

    public void deleteUser(int id)
    {
        UR.deleteById(id);
    }

    public List<User> getAllUsers()
    {
        List<User> U = UR.findAll();
        if(U != null)
        for(User u:U)
        {
            Manager M = u.getManager();
            if(M != null)
            {
                List<Event> E = M.getEvents();
                if(E != null)
                {
                    for(Event e:E)
                    {
                        e.setManager(null);
                        e.setParticipants(null);
                        User u1 = e.getOrganiser();
                        u1.setEventsOrganised(null);
                        e.setOrganiser(u1);
                    }
                    M.setEvents(E);
                }
            }
            u.setEventsOrganised(getEventsWithSomeRestric(u.getEventsOrganised()));
            u.setParticipatedEvent(getParticipantsWithSomeRes(u.getParticipatedEvent()));
        }
        return U;
    }

    public List<User> getAllManagers()
    {
        List<User> U = UR.getAllManagers();
        if(U != null)
        for(User u:U)
        {
            Manager M = u.getManager();
            if(M != null)
            {
                List<Event> E = M.getEvents();
                if(E != null)
                {
                    for(Event e:E)
                    {
                        e.setManager(null);
                        e.setParticipants(null);
                        User u1 = e.getOrganiser();
                        u1.setEventsOrganised(null);
                        e.setOrganiser(u1);
                    }
                    M.setEvents(E);
                }
            }
            if(u.getEventsOrganised() != null)
            u.setEventsOrganised(getEventsWithSomeRestric(u.getEventsOrganised()));
            if(u.getParticipatedEvent() != null)
            u.setParticipatedEvent(getParticipantsWithSomeRes(u.getParticipatedEvent()));
        }
        return U;
    }

    public User LoginUser(String a,String b)
    {
        if(a.toLowerCase().contains("select") || a.toLowerCase().contains("user") || a.toLowerCase().contains("from") || a.toLowerCase().contains(";") || b.toLowerCase().contains(";") || b.toLowerCase().contains("select") || b.toLowerCase().contains("user") || b.toLowerCase().contains("from"))
        return null;
        
        User u = UR.getByUNorEM(a);

        if(u!=null && ECR.decrypt(u.getPassword()).equals(b))
        {
            Manager M = u.getManager();
            if(M != null)
            {
                List<Event> E = M.getEvents();
                if(E != null)
                {
                    for(Event e:E)
                    {
                        e.setManager(null);
                        e.setParticipants(null);
                        User u1 = e.getOrganiser();
                        u1.setEventsOrganised(null);
                        u1.setParticipatedEvent(null);
                        e.setOrganiser(u1);
                    }
                    M.setEvents(E);
                }
            }
            if(u.getEventsOrganised() != null)
            u.setEventsOrganised(getEventsWithSomeRestric(u.getEventsOrganised()));
            if(u.getParticipatedEvent() != null)
            u.setParticipatedEvent(getParticipantsWithSomeRes(u.getParticipatedEvent()));
            return u;
        }

        return null;
    }

    public List<User> getUnacceptedManagers()
    {
        List<User> U = UR.getUnacceptedManagers();
        if(U != null)
        for(User u:U)
        {
            Manager M = u.getManager();
            if(M != null)
            {
                List<Event> E = M.getEvents();
                if(E != null)
                {
                    for(Event e:E)
                    {
                        e.setManager(null);
                        User u1 = e.getOrganiser();
                        u1.setEventsOrganised(null);
                        e.setOrganiser(u1);
                    }
                    M.setEvents(E);
                }
            }
            u.setEventsOrganised(getEventsWithSomeRestric(u.getEventsOrganised()));
            u.setParticipatedEvent(getParticipantsWithSomeRes(u.getParticipatedEvent()));
        }
        return U;
    }

    public void AddNewEvent(int id,Event E)
    {
        User U = UR.findById(id);
        U.getEventsOrganised().add(E);
        UR.save(U);
    }
}
