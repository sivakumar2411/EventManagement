package com.backend.backend.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Participants;
import com.backend.backend.Model.User;
import com.backend.backend.Repository.ParticipantsRepo;

@Service
public class ParticipantService 
{

    @Autowired
    ParticipantsRepo PR;

    @Autowired
    UserService US;

    public void PostNewParticipant(Participants P)
    {
        PR.save(P);
    }

    public List<User> getAllParticipants(int id)
    {
        List<Participants> P = PR.getByEventId(id);
        List<User> U = new ArrayList<User>();
        for(Participants p:P)
        U.add(US.getUserById(p.getId()));
        return U;
    }



}
