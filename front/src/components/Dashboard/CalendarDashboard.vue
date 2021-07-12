<template>
  <v-row class="fill-height">
    <v-col>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="1000px"
        max-height="2000px"
      >
        <template v-slot:activator="{ on }">
          <v-btn outlined color="teal" class="fill-height" dark v-on="on"
            >Voir le calendrier</v-btn
          >
        </template>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Fermer</v-btn
            >
            <v-dialog
              v-model="dialogEvt"
              persistent
              max-width="1000px"
              max-height="2000px"
            >
              <template v-slot:activator="{ on }">
                <v-btn color="blue darken-1" text v-on="on"
                  >Ajouter un evenement</v-btn
                >
              </template>
              <v-card>
                <v-card-title class="justify-center">
                  Ajouter un évenement</v-card-title
                >
                <v-form class="px-3" ref="form" v-model="form">
                  <div>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="evenement.nom"
                          label="Nom de l'évenement"
                          name="nom"
                          type="text"
                          color="blue darken-1"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="evenement.debut"
                          label="Debut"
                          name="debut"
                          type="datetime-local"
                          color="blue darken-1"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="evenement.fin"
                          label="Fin"
                          name="fin"
                          type="datetime-local"
                          color="blue darken-1"
                        />
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="evenement.color"
                          label="Couleur"
                          name="color"
                          :items="color"
                          color="blue darken-1"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-divider class="mt-12"></v-divider>
                    <v-card-actions>
                      <v-btn color="red" text @click="$refs.form.reset()">
                        Reset
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogEvt = false"
                        >Fermer</v-btn
                      >
                      <v-btn
                        color="green"
                        text
                        outlined
                        :disabled="!form"
                        @click="addEvent"
                        >Valider</v-btn
                      >
                    </v-card-actions>
                  </div>
                </v-form>
              </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
            <v-menu bottom right> </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="400">
          <v-calendar
            ref="calendar"
            v-model="focus"
            :event-color="getEventColor"
            :events="events"
            :type="type"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogEvt: false,
    focus: "",
    form: false,
    type: "week",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    evenement: {
      nom: "",
      debut: "",
      fin: "",
      color: "",
    },
    color: ["blue", "green", "red", "purple"],
    relativeID: "",
  }),
  props: {
    relative: {
      type: Object,
    },
    events: {
      type: Array,
    },
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    addEvent: async function() {
      this.getFuckingId();

      this.body = {
        relativeId: this.relativeID,
        nameEvent: this.evenement.nom,
        startEvent: this.evenement.debut,
        endEvent: this.evenement.fin,
        color: this.evenement.color,
      };

      const result = await fetch(
        "https://ter-garmin.herokuapp.com/api/relatives/addEvent",
        {
          method: "POST",
          body: JSON.stringify(this.body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (result.ok) {
        let newEvent = {
          name: this.body.nameEvent,
          start: this.body.startEvent.replace("T", " "),
          end: this.body.endEvent.replace("T", " "),
          color: this.body.color,
        };

        this.events.push(newEvent);
        this.dialogEvt = false;

        alert("Evenement ajouté");
      }
    },
    getFuckingId: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url).then((responseJSON) => {
        responseJSON.json().then((user) => {
          user.relatives.forEach((rel) => {
            if (
              this.relative.prenom == rel.firstname &&
              this.relative.nom == rel.lastname
            ) {
              this.relativeID = rel._id;
              console.log(rel.events);
            }
          });
        });
      });
    },
  },
  mounted() {
  },
};
</script>

<style>
.fill-height {
  text-align: center;
}
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
