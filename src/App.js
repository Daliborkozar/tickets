import { useState, useEffect, createContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Accordion from "./components/Accordion";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
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
  isGrid: true,
  setIsGrid: null
});


const App = () => {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [events, setEvents] = useState([]);
  const [country, setCountry] = useState("germany");
  const [category, setCategory] = useState([]);
  const [sorting, setSorting] = useState("");
  const [pagination, setPagination] = useState(0);
  const [loading, setLoading] = useState(true)
  const [isGrid, setIsGrid] = useState(false)

console.log(events)

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeCategory = (event) => {
    if(event.target.checked){
      let newArry =[ ...category, event.target.value]
      setCategory(newArry)
    }else {
      setCategory( category.filter( item => item !== event.target.value))
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

  let categoryString = category && category.join(',')
  

  useEffect(() => {
    const categoryFetch = async () => {
      const { data } = await axios.get(
        "https://app.ticketmaster.eu/amplify/v2/categories?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&lang=en-us", {
          params: {
            domain: country
          }
        }
      );
      setCategoryList(data.categories);
    };

    categoryFetch();
  }, [country]);
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
        },
      });
      setLoading(false)
      setEvents(data.events);

    };

    eventFetch();
  }, [categoryString, country, pagination, sorting]);

  // const eventsSet = new Set(events);

  // const eventsarr = [...eventsSet];

  return (
    <>
      <div className={classes.root}>
      <GridContext.Provider
      value={{
        isGrid,
        setIsGrid
      }}
    >
        <Navbar grid={isGrid} />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Accordion
              cat={categoryList}
              country={country}
              changeCountry={handleChangeCountry}
              category={category}
              changeCategory={handleChangeCategory}
              sorting={sorting}
              changeSorting={handleSort}
              
            />
          </Grid>
          <Grid item xs={9} className={classes.eventGrid}>
            {loading ? <CircularProgress />
              : events.map((item) => <Card {...item} key={item.id}/>)
              }
            
          </Grid>
          <div style={{ margin: '1rem auto' }} onClick={loadMore}>
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
