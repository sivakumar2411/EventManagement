package com.backend.backend.Repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.backend.Model.Event;
import com.backend.backend.Model.User;

@Repository
public interface EventRepo extends JpaRepository<Event,Integer>
{
    Event findById(int id);

    @Query("select E from Event E where E.publicevent = true and E.status = 'OnGoing'")
    List<Event> getPublicOGEvents();

    @Query("select E from Event E where E.publicevent = true and E.status = 'Completed'")
    List<Event> getPublicComEvents();

    // @Query("select E from Event E where lower(:a) like lower(concat('%',:b,'%'))")
    // List<Event> getByAttribute(String a,String b);

    // @Query("select E from Event E where E.status = :a")
    // List<Event> getByStatus(String a);

    @Query("Select E from Event E where E.manager.id = :id")
    List<Event> getEventsByManager(int id);

    @Query("Select E from Event E where E.organiser.id = :id")
    List<Event> getEventsByOrganiser(int id);

    
    @Query("Select E from Event E where E.fee <= :a")
    List<Event> getEventsByFee(double a);

    @Query("Select E from Event E where E.status in ('Not Accepted','payPending')")
    List<Event> getManaNeedEvents();

    // @Query("Select U from User U where U.id in (Select P.participated_event_id from Participant P where P.participants_id = :id)")
    // List<User> getUsersByParticipatedEventId(int id);
    
}
