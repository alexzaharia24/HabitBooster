import React, {Component} from 'react';
import {View, AsyncStorage, Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Svg, Circle, Rect} from 'react-native-svg';
import {Pie} from 'react-native-pathjs-charts'
import {connect} from "react-redux";

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habits: [],
            filtered: []
        }
    }

    componentDidMount() {
        this.fetchHabits()
    }

    async fetchHabits() {
        let habits = this.props.habits.items;

        let filtered = this.filterByCategory(habits);
        console.log("Filtered: ", filtered);

        this.setState({
            habits: habits,
            filtered: filtered
        });
    }

    filterByCategory(habits) {
        console.log("Habits: ", habits);
        let dict = {};
        let result = [];
        for (let i = 0; i < habits.length; i++) {
            let category = habits[i].category;
            if (dict[category] === undefined) {
                dict[category] = 1;
            } else {
                dict[category]++;
            }
        }

        dict = Object.keys(dict).map((key, index) => {
            result.push({
                "name": key,
                "count": dict[key]
            })
        });

        return result;
    }

    render() {
        let data = this.state.filtered;

        let options = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 350,
            height: 350,
            color: '#2980B9',
            r: 50,
            R: 150,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 14,
                fontWeight: true,
                color: '#ECF0F1'
            }
        };

        return (
            <View style={styles.mainView}>
                <Text style={styles.title}> Distribution of active habits based on category </Text>
                <Pie
                    data={data}
                    options={options}
                    accessorKey="count"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 16
    }
});

const mapStateToProps = (state) => {
    return {
        habits: state.habits
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stats);

