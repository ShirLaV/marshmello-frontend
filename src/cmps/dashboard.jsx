import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { BsCardText } from 'react-icons/bs';
import { AiOutlineGroup } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { TasksPerMemberChart } from './dashboard/tasks-per-members-chart.jsx';
import { TasksPerLabelChart } from './dashboard/tasks-per-labels-chart.jsx';
import {TasksPerDateChart} from './dashboard/tasks-per-date-chart.jsx'
import { boardService } from '../services/board.service.js';
import { Loader } from '../cmps/shared/loader.jsx';
class _Dashboard extends Component {
  state = {
    chartsData: null,
  };
  async componentDidMount() {
    const chartsData = await boardService.dashboardQuery(this.props.board._id);
    this.setState({ chartsData });
  }

  get labelsColor() {
    return this.props.board.labels.map((label) => {
      return label.color;
    });
  }

  render() {
    const { chartsData } = this.state;
    const { board } = this.props;
    console.log('chartsDate', chartsData);
    if (!chartsData) return <Loader />;
    return (
      <div className='dashboard-modal flex column align-center'>
        <button
          className='close-btn'
          onClick={() => this.props.history.goBack()}
        >
          <IoMdClose />
        </button>
        <div className='jeneral-statistics flex'>
          <div className='stats flex space-between'>
            <div>
              <h3>All Tasks</h3>
              <span>{chartsData.cardsCount}</span>
            </div>
            <i className='flex align-center'>
              <BsCardText />
            </i>
          </div>
          <div className='stats flex space-between'>
            <div>
              <h3>All Lists</h3>
              <span>{chartsData.groupsCount}</span>
            </div>
            <i className='flex align-center'>
              <AiOutlineGroup />
            </i>
          </div>
          <div className='stats flex space-between'>
            <div>
              <h3>Members</h3>
              <span>{board.members && board.members.length}</span>
              <span>{!board.members && 0}</span>
            </div>
            <i className='flex align-center'>
              <CgProfile />
            </i>
          </div>
        </div>
        <div className='charts flex'>
          <TasksPerMemberChart
            className='chart'
            tasksPerMemberMap={chartsData.tasksPerMemberMap}
            labelsColors={this.labelsColor}
          />

          <TasksPerLabelChart
            className='chart'
            tasksPerLabelMap={chartsData.tasksPerLabelMap}
            labelsColors={this.labelsColor}
          />
        </div>
        <TasksPerDateChart tasks={chartsData.tasks}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.currBoard,
  };
}

const mapDispatchToProps = {};

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Dashboard);