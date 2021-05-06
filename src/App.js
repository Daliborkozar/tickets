import { useState, useEffect, createContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import CardHorizontal from "./components/CardHorizontal";
import Button from "@material-ui/core/Button";

const API =
  "https://app.ticketmaster.eu/amplify/v2/events?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "90%",
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  eventGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  },
}));

export const GridContext = createContext({
  isGrid: null,
  setIsGrid: null,
});

const App = () => {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [events, setEvents] = useState([]);
  const [country, setCountry] = useState("germany");
  const [category, setCategory] = useState([]);
  const [sorting, setSorting] = useState("");
  const [pagination, setPagination] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(true);
  const [city, setCity] = useState([]);
  const [cityChoice, setCityChoice] = useState();
  const [venueTags, setVenuesTags] = useState([]);
  const [venueSelect, setVenueSelect] = useState([]);
  const [venueInput, setVenueInput] = useState("");

  const venueSelectHandler = (e, v) => {
    const newArray = v.map((item) => item.id);
    setVenueSelect(newArray);
  };

  const inputVenue = (e, v) => {
    setVenueInput(v);
  };
  console.log(venueTags);
  console.log(venueSelect);
  console.log(venueInput);

  const cityChangehandler = (e, v) => {
    let newArray = v.map((item) => item.id);
    setCityChoice(newArray);
  };

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeCategory = (event) => {
    if (event.target.checked) {
      let newArry = [...category, event.target.value];
      setCategory(newArry);
    } else {
      setCategory(category.filter((item) => item !== event.target.value));
    }
  };
  const handleSort = (event) => {
    setSorting(event.target.value);
  };
  //pagination
  const limit = 10;
  const loadMore = () => {
    setPagination(pagination + limit);
  };

  //category array to

  let categoryString = category && category.join(",");

  const countryCode = {
    germany: 276,
    poland: 616,
    spain: 724,
  };

  useEffect(() => {
    const categoryFetch = async () => {
      const { data } = await axios.get(
        "https://app.ticketmaster.eu/amplify/v2/categories?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&lang=en-us",
        {
          params: {
            domain: country,
          },
        }
      );
      setCategoryList(data.categories);
    };

    categoryFetch();
  }, [country]);

  useEffect(() => {
    const citySearch = async () => {
      const { data } = await axios.get(
        "https://app.ticketmaster.eu/amplify/v2/cities?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&lang=en-us",
        {
          params: {
            domain: country,
            country_id: countryCode[`${country}`],
          },
        }
      );
      setCity(data.cities);
    };

    citySearch();
  }, [country]);
  let venueList = venueSelect && venueSelect.join(",");
  useEffect(() => {
    const input = async () => {
      const { data } = await axios.get(
        "https://app.ticketmaster.eu/amplify/v2/venues?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88",
        {
          params: {
            domain: country,
            venue_name: venueInput,
          },
        }
      );
      setVenuesTags(data.venues);
    };

    input();
  }, [country, venueInput]);

  let cityChoicejoin = cityChoice && cityChoice.join(",");

  // "https://app.ticketmaster.eu/amplify/v2/events?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=germany&lang=en-us&sort_by=eventdate&start=0&rows=12"
  useEffect(() => {
    const eventFetch = async () => {
      const { data } = await axios.get(API, {
        params: {
          domain: country,
          sort_by: sorting,
          category_ids: categoryString,
          start: pagination,
          rows: 12,
          city_ids: cityChoicejoin,
          venue_ids: venueList,
        },
      });
      setLoading(false);
      setEvents(data.events);
    };

    eventFetch();
  }, [categoryString, cityChoicejoin, country, pagination, sorting, venueList]);

  return (
    <>
      <div className={classes.root}>
        <GridContext.Provider
          value={{
            isGrid,
            setIsGrid,
            events,
            country,
            handleChangeCountry,
            category,
            handleChangeCategory,
            sorting,
            handleSort,
            categoryList,
            city,
            cityChoice,
            cityChangehandler,
            inputVenue,
            venueSelectHandler,
            venueTags,
            venueSelect,
          }}
        >
          <Navbar grid={isGrid} />
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.eventGrid}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {isGrid
                    ? events.map((item) => <Card {...item} key={item.id} />)
                    : events.map((item) => (
                        <CardHorizontal {...item} key={item.id} />
                      ))}
                </>
              )}
              
            </Grid>
            <div style={{ margin: "1rem auto" }} onClick={loadMore}>
              <Button variant="contained" color="primary">
                Load more...
              </Button>
            </div>
          </Grid>
        </GridContext.Provider>
      </div>
    </>
  );
};

export default App;
