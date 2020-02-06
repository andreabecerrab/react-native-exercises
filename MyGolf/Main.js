
//import for react native basic viwes
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
//export for font and icons
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
//import from nativeBase
import {
    Body, Container, Header, Content, Icon, Picker,
    Form, Title, Grid, Col, Row, Text, Card, CardItem, Spinner
} from 'native-base';
import axios from "axios";


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingCourses: true,
            loadingScores: false,
            courses: [],
            scores: [],
            selectedCourseIndex: 0
        }
    }


    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        await this.getCourses();
        await this.getScores(this.state.courses[this.state.selectedCourseIndex].shortname);
        this.setState({ loadingScores: false });
    }

    getCourses = async () => {
        let res = await axios.get("https://student.labranet.jamk.fi/~mapas/data/react_native_golf_courses.json");
        this.setState({ courses: res.data.courses, loadingCourses: false, loadingScores: true });

    };

    getScores = async (course) => {
        let res = await axios.get("https://student.labranet.jamk.fi/~mapas/data/react_native_golf_scores_" + course + ".json");
        this.setState({ scores: res.data.reverse(), loadingScores: false });
    };

    onValueChange(value) {
        this.setState({
            selectedCourseIndex: value, loadingScores: true
        });
        this.getScores(this.state.courses[value].shortname);
    }


    render() {
        //console.log(this.state.loadingCourses);
        if (this.state.loadingCourses) {
            return (
                <View style={styles.container}>
                    <Spinner color="black"></Spinner>
                    <Text>Loading courses data, please wait...</Text>
                </View>
            );
        }

        // show courses in picker
        var courses = this.state.courses.map(function (course, index) {
            return (
                <Picker.Item label={course.name} value={index} key={index} />
            )
        });
        console.log(courses);

        //load scores
        var scores;

        // loading scores
        if (this.state.loadingScores) {
            scores =
                <View style={styles.container}>
                    <Spinner color="black"></Spinner>
                    <Text>Loading scores data, please wait...</Text>
                </View>
        }

        // creating all about scores and cards
        scores = this.state.scores.map(function (score, index) {
            // calc front
            var frontScore = 0;
            var front = score.front.map(function (holeScore, index) {
                frontScore += holeScore;
                // par, birdie, eagle, bogey or double bogey (or worse)
                var scoreText = <Text style={[styles.textCenter, styles.text]}>{holeScore}</Text>;
                //if for styling 
                if (holeScore == this.state.courses[this.state.selectedCourseIndex].holes[index].par - 1) {
                    scoreText = <Text style={[styles.birdie, styles.text]}>{holeScore}</Text>;
                } else if (holeScore == this.state.courses[this.state.selectedCourseIndex].holes[index].par - 2) {
                    scoreText = <Text style={[styles.eagle, styles.text]}>{holeScore}</Text>;
                } else if (holeScore == this.state.courses[this.state.selectedCourseIndex].holes[index].par + 1) {
                    scoreText = <Text style={[styles.bogey, styles.text]}>{holeScore}</Text>;
                } else if (holeScore >= this.state.courses[this.state.selectedCourseIndex].holes[index].par + 2) {
                    scoreText = <Text style={[styles.doublebogey, styles.text]}>{holeScore}</Text>;
                }
                return (
                    //dinsplaying card with holes par and hcp
                    <Col key={index}>
                        <Text style={[styles.textCenter, styles.text, styles.holeHeaderText]}>{index + 1}</Text>
                        <Text style={[styles.textCenter, styles.text]}>{this.state.courses[this.state.selectedCourseIndex].holes[index].par}</Text>
                        <Text style={[styles.textCenter, styles.text]}>{this.state.courses[this.state.selectedCourseIndex].holes[index].hcp}</Text>
                        {scoreText}
                    </Col>
                );
            }.bind(this));

            //calculate back data (holes from 10 --> 18)
            // calc back
            var backScore = 0;
            var back = score.back.map(function (holeScore, index) {
                var bIndex = index + 9;
                backScore += holeScore;

                //if for styling
                var scoreText = <Text style={[styles.textCenter, styles.text]}>{holeScore}</Text>;
                if (holeScore == this.state.courses[this.state.selectedCourseIndex].holes[bIndex].par - 1) {
                    scoreText = <Text style={[styles.birdie, styles.text]}>{holeScore}</Text>;
                } else if (holeScore == this.state.courses[this.state.selectedCourseIndex].holes[bIndex].par - 2) {
                    scoreText = <Text style={[styles.eagle, styles.text]}>{holeScore}</Text>;
                } else if (holeScore == this.state.courses[this.state.selectedCourseIndex].holes[bIndex].par + 1) {
                    scoreText = <Text style={[styles.bogey, styles.text]}>{holeScore}</Text>;
                } else if (holeScore >= this.state.courses[this.state.selectedCourseIndex].holes[bIndex].par + 2) {
                    scoreText = <Text style={[styles.doublebogey, styles.text]}>{holeScore}</Text>;
                }
                return (
                    <Col key={index}>
                        <Text style={[styles.textCenter, styles.text, styles.holeHeaderText]}>{bIndex + 1}</Text>
                        <Text style={[styles.textCenter, styles.text]}>{this.state.courses[this.state.selectedCourseIndex].holes[bIndex].par}</Text>
                        <Text style={[styles.textCenter, styles.text]}>{this.state.courses[this.state.selectedCourseIndex].holes[bIndex].hcp}</Text>
                        {scoreText}
                    </Col>
                );
            }.bind(this));

            //creating card component with all the front and back scores
            return (
                <Card key={index}>
                    <CardItem header>
                        <Text>ScoreCard - {score.date} - {score.course}</Text>
                    </CardItem>
                    <CardItem>
                        <Grid>
                            <Text style={styles.frontBackText}>Front</Text>
                            <Row style={styles.row}>
                                <Col>
                                    <Text style={[styles.text, styles.holeHeaderText]}>Hole</Text>
                                    <Text style={styles.text}>Par</Text>
                                    <Text style={styles.text}>Hcp</Text>
                                    <Text style={styles.text}>Score</Text>
                                </Col>
                                {front}
                            </Row>
                            <Text style={styles.frontBackText}>Back</Text>
                            <Row style={styles.row}>
                                <Col>
                                    <Text style={[styles.text, styles.holeHeaderText]}>Hole</Text>
                                    <Text style={styles.text}>Par</Text>
                                    <Text style={styles.text}>Hcp</Text>
                                    <Text style={styles.text}>Score</Text>
                                </Col>
                                {back}
                            </Row>
                        </Grid>
                    </CardItem>
                    <CardItem footer>
                        <Text style={styles.text}>Front: {frontScore}, Back: {backScore}, Total: {frontScore + backScore}</Text>
                    </CardItem>
                </Card>
            )


        }.bind(this));




        return (
            <Container>
                <Header>
                    <Body>
                        <Title>MyGolf</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Picker
                            mode="dropdown"
                            iosHeader="Course"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            selectedValue={this.state.selectedCourseIndex}
                            onValueChange={this.onValueChange.bind(this)}>
                            {courses}
                        </Picker>
                    </Form>
                    <ScrollView>
                        {scores}
                    </ScrollView>
                </Content>
            </Container>
        );
    }


};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eagle: {
        backgroundColor: 'yellow',
        color: 'black',
        textAlign: 'center',
        margin: 2
    },
    birdie: {
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        margin: 2
    },
    par: {
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        margin: 2
    },
    bogey: {
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        margin: 2
    },
    doublebogey: {
        backgroundColor: 'darkblue',
        color: 'white',
        textAlign: 'center',
        margin: 2
    },
    textCenter: {
        textAlign: 'center'
    },
    row: {
        marginBottom: 10
    },
    text: {
        fontSize: 11
    },
    holeHeaderText: {
        backgroundColor: 'lightgray'
    },
    frontBackText: {
        fontSize: 11,
        fontWeight: 'bold'
    }
});

export default Main;