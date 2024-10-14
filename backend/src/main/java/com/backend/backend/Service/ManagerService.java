package com.backend.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Event;
import com.backend.backend.Model.Manager;
import com.backend.backend.Model.Participants;
import com.backend.backend.Model.User;
import com.backend.backend.Repository.ManagerRepo;

@Service
public class ManagerService 
{
    @Autowired
    ManagerRepo MR;

    @Autowired
    EventService ES;

    @Autowired
    UserService US;

    public void PostNewManager(Manager M)
    {
        MR.save(M);
    }

    public void UpdateManager(Manager M)
    {
        MR.save(M);
    }

    public void DeleteManager(int id)
    {
        MR.deleteById(id);
    }

    List<Participants> GetPartiWithRes(List<Participants> P)
    {
        if(P != null)
        for(Participants p:P)
        {
            p.setEvent(null);
            p.setUser(null);
        }
        return P;
    }

    public Manager getManagerById(int id)
    {
        Manager M = MR.findById(id);
        List<Event> E = M.getEvents();
        if(E != null)
        {
            for(Event e:E)
            {
                e.setManager(null);
                User u = e.getOrganiser();
                u.setEventsOrganised(null);
                e.setOrganiser(u);
                e.setParticipants(null);
            }
        }
        return M;
    }

    public List<Manager> getRequests()
    {
        return MR.getRequests();
    }

    public List<Event> getEventsByManaId(int id)
    {
        List<Event> E = ES.getAllEventsByMana(id);
        if(E == null)
        return E;
        for(Event e:E)
        {
            e.setManager(null);
            User u = e.getOrganiser();
            u.setEventsOrganised(null);
            e.setOrganiser(u);
            e.setParticipants(null);
        }
        return E;
    }

    public List<User> getAllManagers()
    {
        List<User>U = US.getAllManagers();
        for(User u:U)
        {
            Manager M = u.getManager();
            List<Event> E = M.getEvents();
            if(E != null)
            {
                for(Event e:E)
                {
                    e.setManager(null);
                    User u1 = e.getOrganiser();
                    u1.setEventsOrganised(null);
                    e.setOrganiser(u1);
                    e.setParticipants(null);
                }
                M.setEvents(E);
            }
            u.setManager(M);
        }
        return U;
    }

    public List<Manager> getByPlace(String a)
    {
        List<Manager> M = MR.getByPlace(a);
        for(Manager m: M)
        {
            List<Event> E = m.getEvents();
            if(E != null)
            {
                for(Event e:E)
                {
                    e.setManager(null);
                    User u = e.getOrganiser();
                    u.setEventsOrganised(null);
                    e.setOrganiser(u);
                    e.setParticipants(null);
                }
                m.setEvents(E);
            }
        }
        return M;
    }

    public List<Manager> getTopManagers()
    {
        List<Manager> M = MR.getTopManagers();
        for(Manager m: M)
        {
            List<Event> E = m.getEvents();
            if(E != null)
            {
                for(Event e:E)
                {
                    e.setManager(null);
                    User u = e.getOrganiser();
                    u.setEventsOrganised(null);
                    e.setOrganiser(u);
                    e.setParticipants(null);
                }
                m.setEvents(E);
            }
        }
        return M;
    }

    public void EventRequestToAll(int id)
    {
        List<Manager> managers = MR.findAll();
        for(Manager m:managers)
        {
            m.getReqeids().add(id);
            MR.save(m);
        }
    }

}
