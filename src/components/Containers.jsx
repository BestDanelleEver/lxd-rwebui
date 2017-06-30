import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Checkbox from 'material-ui/Checkbox';

import { connect } from 'react-redux';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { Card, CardTitle } from 'material-ui/Card';

import { list, reset } from '../actions/containers';

class Containers extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    containers: PropTypes.arrayOf(
      PropTypes.shape({}),
    ).isRequired,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.list();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  renderTableBody() {
    if (this.props.containers) {
      return this.props.containers.map(container => (
        <TableRow key={container.name()}>
          <TableRowColumn>
            <Link to={`/containers/${container.name()}`} >
              {container.name()}
            </Link>
          </TableRowColumn>
          <TableRowColumn>{container.architecture()}</TableRowColumn>
          <TableRowColumn style={{ textAlign: 'center' }}><Checkbox
            checked={container.stateful()}
            disabled
          />
          </TableRowColumn>
          <TableRowColumn style={{ textAlign: 'center' }}><Checkbox
            checked={container.ephemeral()}
            disabled
          />
          </TableRowColumn>
          <TableRowColumn>{container.status()}</TableRowColumn>
        </TableRow>
        ),
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <Card className="container">
          <CardTitle title="Containers" subtitle="List of LXD containers" />
          {this.props.loading && <div className="container">Loading...</div>}
          {this.props.error && <div className="container">{this.props.error}</div>}
          <Table
            fixedHeader
            selectable={false}
            multiSelectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Arch</TableHeaderColumn>
                <TableHeaderColumn>Stateful</TableHeaderColumn>
                <TableHeaderColumn>Ephemeral</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.renderTableBody()}
            </TableBody>
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  containers: state.containers.containers,
  error: state.containers.error,
  loading: state.containers.loading,
});

const mapDispatchToProps = dispatch => ({
  list: () => dispatch(list()),
  reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Containers);
