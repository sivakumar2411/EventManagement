package com.backend.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Event;
import com.backend.backend.Model.Manager;
import com.backend.backend.Repository.ManagerRepo;

@Service
public class ManagerService 
{
    @Autowired
    ManagerRepo MR;

    @Autowired
    EventService ES;

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

    public Manager getManagerById(int id)
    {
        return MR.findById(id);
    }

    public List<Manager> getRequests()
    {
        return MR.getRequests();
    }

    public List<Event> getEventsByManaId(int id)
    {
        return ES.getAllEventsByMana(id);
    }

    public List<Manager> getAllManagers()
    {
        return MR.findAllManagers();
    }
}
