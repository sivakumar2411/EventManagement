package com.backend.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.backend.Model.Participants;

@Repository
public interface ParticipantsRepo extends JpaRepository<Participants,Integer> {

    Participants findById(int id);

    @Query("Select P from Participants P where P.event.id = :id")
    List<Participants> getByEventId(int id);

}
