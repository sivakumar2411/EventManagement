package com.backend.backend.Model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Event 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String ename,description,type,place,status;

    private boolean publicevent;

    private double fee,budget;

    private int expectedPeople;

    private Date eventDate;

    @ManyToOne(cascade = CascadeType.ALL)
    private User organiser;

    @ManyToOne(cascade = CascadeType.ALL)
    private Manager manager;

    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL)
    private List<Participants> participants;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Review> review;

}
