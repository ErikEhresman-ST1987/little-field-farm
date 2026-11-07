// Story content only. Add new stories here; no engine edits needed for ordinary dialogue, choices, or delivery objectives.
window.FarmStoryCatalog = [
  {
    "id": "juliette",
    "title": "The Unexpected Dinner Guest",
    "lead": "Juliette",
    "unlockCustomer": 0,
    "chapters": [
      {
        "title": "An Old Friend Returns",
        "lines": [
          "Juliette arrives at the farm, waving a letter.",
          "Juliette: Wonderful news! Keiko O’Brien is coming home to teach at our school! We grew up together. She was the sensible one. I was the one who tried making strawberry jam without a recipe.",
          "Juliette: We couldn’t.",
          "Juliette: I want to welcome her with an extraordinary dinner! Would you help with some fresh farm ingredients?"
        ],
        "choices": [
          {
            "text": "I'd be happy to help.",
            "reply": [
              "Juliette: Splendid! Now, do you suppose Keiko still likes strawberries?"
            ]
          },
          {
            "text": "What ingredients do you need?",
            "reply": [
              "Juliette: A little fresh wheat for bread would be wonderful! Now, do you suppose Keiko still likes strawberries?"
            ]
          }
        ],
        "objective": {
          "type": "deliver",
          "item": "wheat",
          "quantity": 2,
          "label": "Deliver 2 wheat for Juliette's dinner"
        }
      },
      {
        "title": "A Recipe for Trouble",
        "lines": [
          "Juliette returns with an enormous menu. Felix follows, carrying a checklist.",
          "Felix: You’ve forgotten the table linens, serving dishes, and number of guests.",
          "Juliette: Felix, I’m planning dinner, not a military campaign!",
          "Felix: Then why does your menu require three pages?",
          "Juliette sighs.",
          "Juliette: I just want Keiko to see what I’ve accomplished.",
          "Felix: Perhaps she’d rather see what hasn’t changed.",
          "Juliette smiles.",
          "Juliette: We once made a picnic together. Strawberries, sunshine, and sandwiches without bread.",
          "Felix: Naturally.",
          "Juliette: You’re right. I’ll make something simple. Something that reminds her of home."
        ],
        "choices": [
          {
            "text": "That sounds like a lovely welcome.",
            "reply": [
              "Juliette: I hope so. I think Keiko would rather see an old friend than a fancy menu."
            ]
          },
          {
            "text": "Sometimes simple is best.",
            "reply": [
              "Juliette: Exactly! And this time, I intend to remember it."
            ]
          }
        ]
      },
      {
        "title": "A Seat at the Table",
        "lines": [
          "Keiko arrives. The two friends embrace.",
          "Keiko: Juliette! It’s been years!",
          "Juliette: I planned an extraordinary dinner, but I changed everything. I wanted you to be impressed.",
          "Keiko: I already am. Do you remember our picnic beneath the apple tree?",
          "Juliette: The sandwiches without bread?",
          "Keiko: The best afternoon I ever spent with my friend.",
          "Juliette smiles.",
          "Juliette: Well, tonight we have actual bread!",
          "Keiko turns to the farmer.",
          "Keiko: You must be Gramps’ grandchild! It’s lovely to meet you. I hope we can work together on some school projects.",
          "Juliette: But first, dinner! Felix has even counted the chairs.",
          "Keiko: How many guests?",
          "Juliette: Five.",
          "Keiko: And chairs?",
          "Juliette: Six. Apparently, there’s always room for another friend."
        ]
      }
    ]
  }
];
