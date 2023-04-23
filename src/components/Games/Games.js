import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Icon,
  Image,
  Input,
  Item,
  Label,
  Segment,
} from "semantic-ui-react";

const Games = () => {
  const [games, setGames] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getGames = async (e) => {
    await fetch("http://localhost:3001/games", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGames(data);
        console.log("list of games: ", data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    getGames();
  }, []);

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const filteredGames = selectedCategoryId
    ? games.filter((game) => game.categoryIds.includes(selectedCategoryId))
    : games;

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchedGames = searchQuery
    ? filteredGames.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredGames;

  const launchGame = (gameCode) => {
    const width = 640;
    const height = 480;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    if (gameCode.length > 0) {
      const url = `https://comeon-static-test.casinomodule.com/games/${gameCode}_mobile_html/game/${gameCode}_mobile_html.xhtml?server=https%3A%2F%2Fcomeon-game-test.casinomodule.com%2F&lang=sv&sessId=DEMO-41e133d5237c402-EUR&gameId=${gameCode}_not_mobile_sw&operatorId=default&staticsharedurl=http%3A%2F%2Fstatic-shared.casinomodule.com%2Fgameclient_html%2Fdevicedetection%2Fcurrent`;
      window.open(
        url,
        `width=${width},height=${height},left=${left},top=${top}`
      );

      console.log("link is ", url);
    }
  };

  return (
    <Container>
      <Segment clearing basic>
        <Segment basic floated="right">
          <Input
            size="large"
            icon="search"
            type="text"
            placeholder="Search for a game"
            value={searchQuery}
            onChange={handleSearchQuery}
          />
        </Segment>
      </Segment>

      <Grid reversed={"computer"}>
        <Grid.Column mobile={8} tablet={8} computer={3}>
          <h2>Categories</h2>
          <Button.Group vertical divided color="olive">
            <Button onClick={() => handleCategoryFilter(null)}>ALL</Button>
            <Button onClick={() => handleCategoryFilter(1)}>VIDEO SLOTS</Button>
            <Button onClick={() => handleCategoryFilter(2)}>
              SLOT MACHINES
            </Button>
          </Button.Group>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <h2>Games</h2>
          {searchedGames.map((game) => (
            <div>
              <Container style={{ paddingTop: 10 }}>
                <Item.Group divided key={game.id}>
                  <Item>
                    <Item.Image src={game.icon} />
                    <Item.Content>
                      <Item.Header as="a">{game.name}</Item.Header>
                      <Item.Description>{game.description}</Item.Description>
                      <Item.Extra>
                        <Button
                          floated="right"
                          color="olive"
                          onClick={() => launchGame(game.code)}
                        >
                          Play
                          <Icon name="chevron right" />
                        </Button>
                        <Label>{game.code}</Label>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Container>
            </div>
          ))}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Games;
