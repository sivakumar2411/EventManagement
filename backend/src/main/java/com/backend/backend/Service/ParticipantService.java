package com.backend.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Event;
import com.backend.backend.Model.Participants;
import com.backend.backend.Model.User;
import com.backend.backend.Repository.ParticipantsRepo;

@Service
public class ParticipantService 
{

    @Autowired
    ParticipantsRepo PR;

    public void PostNewParticipant(Participants P)
    {
        PR.save(P);
    }

    public List<User> getAllParticipants(int id)
    {
        return PR.getByEventId(id);
    }

    public List<Event> getEventsByParticipant(int id)
    {
        return PR.getByUserId(id);
    }


}
