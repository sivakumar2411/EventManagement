package com.backend.backend.Model;

import java.util.Date;
import java.util.List;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Manager 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName,lastName,address,city,state,postCode,email,mobNo;

    @OneToMany(mappedBy ="manager",cascade = CascadeType.ALL)
    private List<Event> events;

    @OneToOne(cascade = CascadeType.ALL)
    private Review review;

    @Lob
    private String resume,profImg;

    private int exp;

    private boolean accept = false;

    private Date birthDate;
}
