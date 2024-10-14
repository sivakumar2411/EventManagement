package com.backend.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.backend.Model.Event;
import com.backend.backend.Model.Participants;
import com.backend.backend.Model.User;

@Repository
public interface ParticipantsRepo extends JpaRepository<Participants,Integer> {

    Participants findById(int id);

    @Query("Select P.user from Participants P where P.event.id = :id")
    List<User> getByEventId(int id);

    @Query("Select P.event from Participants P where P.user.id = :id")
    List<Event> getByUserId(int id);

    // @Query("Select E.id from Participants P join Event E on P.event.id = P.id where P.user.id = :id")
    // List<Integer> getByUserId(int id);

}
