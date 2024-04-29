import { useEffect, useState } from 'react';

export const FILTER_TYPES = {
  NAME: 'name',
  SPECIES: 'species',
  PLANET: 'planet',
};

export const useStarWarsData = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  const [peopleList, setPeople] = useState([]);
  const [peopleMaster, setPeopleMaster] = useState([]);

  // Inital Fetch for Star Wars Data
  useEffect(() => {
    const fetchPeople = () => {
      return fetch('https://swapi.info/api/people')
        .then((response) => response.json())
        .catch((error) => setError(error));
    };

    const fetchPlanets = () => {
      return fetch('https://swapi.info/api/planets')
        .then((response) => response.json())
        .catch((error) => setError(error));
    };

    const fetchSpecies = () => {
      return fetch('https://swapi.info/api/species')
        .then((response) => response.json())
        .catch((error) => setError(error));
    };

    const fetchStarWarsData = async () => {
      const [peopleData, planetsData, speciesData] = await Promise.all([
        fetchPeople(),
        fetchPlanets(),
        fetchSpecies(),
      ]);

      const planets = mapData(planetsData);
      const species = mapData(speciesData);
      const people = mapPeople(peopleData, planets, species);
      localStorage.setItem('peopleData', JSON.stringify(people));

      setPeopleMaster(people);
      setPeople(people);
    };

    setLoading(true);

    const people = JSON.parse(localStorage.getItem('peopleData'));
    if (people) {
      setPeopleMaster(people);
      setPeople(people);
    } else {
      fetchStarWarsData();
    }

    setLoading(false);
  }, []);

  // Search Function to Filter People based on Search String and Filter Type
  const search = (searchString, filterType) => {
    let filteredPeople = [];
    setLoading(true);

    if (!searchString) {
      setPeople(peopleMaster);
      setLoading(false);
      return;
    }

    if (filterType === FILTER_TYPES.NAME) {
      filteredPeople = peopleMaster.filter(({ name }) =>
        name.toLowerCase().includes(searchString.toLowerCase())
      );
    } else if (filterType === FILTER_TYPES.SPECIES) {
      filteredPeople = peopleMaster.filter(({ species }) =>
        species.toLowerCase().includes(searchString.toLowerCase())
      );
    } else if (filterType === FILTER_TYPES.PLANET) {
      filteredPeople = peopleMaster.filter(({ world }) =>
        world.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    setPeople(filteredPeople);
    setLoading(false);
  };

  return { isLoading, isError, search, peopleList };
};

//Common Function to Map Planets and Species into a Map
const mapData = (data) => {
  return data.reduce((acc, item) => {
    acc[item.url] = item;
    return acc;
  }, {});
};

// Function to map a Person with their Homeworld and Species
const mapPeople = (peopleData, planetsMap, speciesMap) => {
  return peopleData.map((person) => {
    const { name, homeworld, species } = person;
    return {
      name,
      world: planetsMap[homeworld]?.name || 'Unknown',
      species: species.length ? speciesMap[species]?.name : 'Human',
    };
  });
};
