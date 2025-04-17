import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { FormControl, ListGroup } from "react-bootstrap";
import { addModule, editModule, updateModule, deleteModule, setModules }
    from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    const addModuleHandler = async () => {
        const newModule = await coursesClient.createModuleForCourse(cid!, {
            name: moduleName,
            course: cid,
        });
        dispatch(addModule(newModule));
        setModuleName("");
    };

    const fetchModulesForCourse = async () => {
        const modules = await coursesClient.findModulesForCourse(cid!);
        dispatch(setModules(modules));
    };
    useEffect(() => {
        fetchModulesForCourse();
    }, [cid]);

    const createModuleForCourse = async () => {
        if (!cid) return;
        const newModule = { name: moduleName, course: cid };
        const module = await coursesClient.createModuleForCourse(cid, newModule);
        dispatch(addModule(module));
    };
    const removeModule = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };

    const saveModule = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };
    const deleteModuleHandler = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };
    const updateModuleHandler = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
      };
     


    return (
        <div>
            {/* <ModulesControls setModuleName={setModuleName} moduleName={moduleName}
                addModule={() => {
                    dispatch(addModule({ name: moduleName, course: cid }));
                    setModuleName("")
                }} /> */}
            <ModulesControls addModule={addModuleHandler} setModuleName={setModuleName} moduleName={moduleName} />

            <br /><br /><br /><br />
            <ListGroup id="wd-modules" className="rounded-0">
                {modules
                    .map((module: any) => (
                        <li
                            className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
                            key={module._id}
                        >
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                {!module.editing && module.name}
                                {module.editing && (
                                    <input onChange={(e) =>
                                        updateModuleHandler({ ...module, name: e.target.value }) }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          updateModuleHandler({ ...module, editing: false });
                                        }
                                      }}
                                      value={module.name}/>
                                )}
                                <ModuleControlButtons moduleId={module._id}
                                    deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                                    editModule={(moduleId) => dispatch(editModule(moduleId))} />

                            </div>
                            {module.lessons && (
                                <ul className="wd-lessons list-group rounded-0">
                                    {module.lessons.map((lesson: any) => (
                                        <li
                                            className="wd-lesson list-group-item p-3 ps-1"
                                            key={lesson._id}
                                        >
                                            <BsGripVertical className="me-2 fs-3" />
                                            {lesson.name}
                                            <LessonControlButtons />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )
                    )}
            </ListGroup>
        </div>

    );
};

