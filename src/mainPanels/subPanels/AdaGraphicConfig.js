import {
  InfoBadge,
  GraphicParamBox,
  HandedSelection,
  AfterEnterSelection,
  EnterTemplateSelection,
  TimelineSection,
  UpdateHandedSelection,
  UpdateTemplateSelection,
  AfterUpdateSelection,
} from "../../widgets/configWidgets";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { canvasObjects } from "../../global";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdaGraphicConfig(props) {
  const selectedText = props.selectedText;
  const status = props.status;
  const obj = canvasObjects.idDict[props.objectId];
  const handleExpand = () => {
    canvasObjects.setSelection(obj);
  };
  const removeObject = () => {
    const curFocus = canvasObjects.focus;
    const curId = curFocus.objectId;
    curFocus.exitCanvas();
    // remove from obejctDict
    let newList = [];
    canvasObjects.objectDict[canvasObjects.focusedText].forEach((e) => {
      if (e.objectId !== curId) {
        newList.push(e);
      }
    });
    canvasObjects.objectDict[canvasObjects.focusedText] = newList;
    // remove from updateDict
    let newList2 = [];
    if (
      canvasObjects.updatetDict &&
      canvasObjects.updateDict[canvasObjects.focusedText]
    ) {
      canvasObjects.updatetDict[canvasObjects.focusedText].forEach((e) => {
        if (e.objectId !== curId) {
          newList2.push(e);
        }
      });
    }
    canvasObjects.updateDict[canvasObjects.focusedText] = newList2;
    // remove from idDict
    delete canvasObjects.idDict[curId];
    canvasObjects.rerenderConfig();
  };
  const removeState = () => {
    const curFocus = canvasObjects.focus;
    const curId = curFocus.objectId;
  };
  return (
    <div>
      {status === "enter" && (
        <Accordion
          onChange={() => {
            handleExpand();
          }}
          id={props.objectId}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <InfoBadge status={status} selectedText={selectedText} />
          </AccordionSummary>
          {/* <GraphicParamBox status={status} selectedText={selectedText} /> */}
          <AccordionDetails>
            <EnterTemplateSelection
              status={status}
              selectedText={selectedText}
            />
            <HandedSelection status={status} selectedText={selectedText} />
            <AfterEnterSelection status={status} selectedText={selectedText} />
            <IconButton aria-label="delete" onClick={removeObject}>
              <DeleteIcon />
            </IconButton>
          </AccordionDetails>
          {/* <TimelineSection status={status} selectedText={selectedText} /> */}
        </Accordion>
      )}
      {status === "update" && (
        <Accordion
          onChange={(e, ep) => {
            handleExpand(ep);
          }}
          id={props.objectId}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <InfoBadge status={status} selectedText={selectedText} />
          </AccordionSummary>
          {/* <GraphicParamBox status={status} selectedText={selectedText} /> */}
          <AccordionDetails>
            <UpdateTemplateSelection
              status={status}
              selectedText={selectedText}
            />
            <UpdateHandedSelection
              status={status}
              selectedText={selectedText}
            />
            <AfterUpdateSelection status={status} selectedText={selectedText} />
            <IconButton aria-label="delete" onClick={() => {}}>
              <DeleteIcon />
            </IconButton>
          </AccordionDetails>
          {/* <TimelineSection status={status} selectedText={selectedText} /> */}
        </Accordion>
      )}
    </div>
  );
}
