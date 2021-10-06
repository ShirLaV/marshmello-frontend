import TimeLine from "react-gantt-timeline";

export function TasksPerDateChart({tasks}) {
  const config = {
    header: {
      top: {
        style: {
          background: "linear-gradient( grey, black)",
          textShadow: "0.5px 0.5px black",
          fontSize: 12
        }
      },
      middle: {
        style: {
          background: "linear-gradient( #b686c2, white)",
          fontSize: 9,
          color: "black"
        }
      },
      bottom: {
        style: {
          background: "linear-gradient( grey, black)",
          fontSize: 9,
          color: "#b686c2"
        },
        selectedStyle: {
          background: "linear-gradient( #d011dd ,#d011dd)",
          fontWeight: "bold",
          color: "white"
        }
      }
    },
    taskList: {
      title: {
        label: "Task Todo",
        style: {
          background: "linear-gradient( grey, black)"
        }
      },
      task: {
        style: {
          backgroundColor: "grey",
          color: "white"
        }
      },
      verticalSeparator: {
        style: {
          backgroundColor: "#fbf9f9",
        },
        grip: {
          style: {
            backgroundColor: "#b686c2",
          }
        }
      }
    },
    dataViewPort: {
      rows: {
        style: {
          backgroundColor: "white",
          borderBottom: "solid 0.5px silver"
        }
      },
      task: {
        showLabel: false,
        style: {
          backgroundColor: "#b686c2",
          borderRadius: 1,
          boxShadow: "2px 2px 8px #888888"
                }
      }
    }
  };
  return (
    <div className="time-line-container">
      <TimeLine data={tasks} links={[]} config={config}/>
    </div>
  )
}

