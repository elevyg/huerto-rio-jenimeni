"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { type ComponentProps, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "~/components/ui/multiselect";
import { Textarea } from "~/components/ui/textarea";
import { schedule } from "~/data/program-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema, type FormData } from "~/schema/form";
import { onSubmitAction } from "~/server/formSubmit";
import { X } from "lucide-react";

const options = schedule.map((program) => ({
  value: program.group,
  label: `${program.group} - ${program.dateRange}`,
}));

export default function ApplySection() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [value, setValue] = useState<string[]>([]);

  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setFormValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groups: [],
      why: "",
      experience: "",
      knowledge: "",
      skills: "",
      ...(state?.fields ?? {}),
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      console.log(e.target.files[0]);
      setVideoFile(e.target.files[0]);
    }
  };

  const handleMultiSelectorChange = (newValue: string[]) => {
    setValue(newValue);
    setFormValue("groups", newValue);
  };

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <section id="apply" className="mb-24">
      <h2 className="mb-6 font-serif text-2xl md:text-3xl">
        Aplicar al Programa
      </h2>
      <Tabs defaultValue="video">
        <TabsList className="mb-6">
          <TabsTrigger value="video" className="text-base md:text-lg">
            Video
          </TabsTrigger>
          <TabsTrigger value="form" className="text-base md:text-lg">
            Formulario
          </TabsTrigger>
        </TabsList>
        <TabsContent value="video">
          <Card>
            <CardContent>
              <form
                onSubmit={() => {
                  return;
                }}
              >
                <div className="mt-6 space-y-6">
                  <p className="text-base md:text-lg">
                    Sube un video respondiendo a las siguientes preguntas:
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-base md:text-lg">
                    <li>¿Por qué te gustaría venir?</li>
                    <li>¿Qué experiencia previa tienes?</li>
                    <li>¿Qué harás con el conocimiento adquirido?</li>
                    <li>
                      ¿Cuáles son tus habilidades y competencias que puedes
                      aportar al huerto?
                    </li>
                  </ul>
                  <div>
                    <label
                      htmlFor="why"
                      className="mb-2 block text-base md:text-lg"
                    >
                      ¿Que grupos de voluntarios te interesan?
                    </label>
                    <GroupMultiSelector
                      values={value}
                      onValuesChange={handleMultiSelectorChange}
                      loop={false}
                    />
                  </div>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="text-base md:text-lg"
                  />
                  {videoFile && (
                    <p className="text-base md:text-lg">
                      Archivo seleccionado: {videoFile.name}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="bg-[#2c5545] px-6 py-3 text-base text-white hover:bg-[#1e3c2f] md:text-lg"
                  >
                    Subir Video
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="form">
          <Card>
            <CardContent>
              <form
                ref={formRef}
                action={formAction}
                onSubmit={(evt) => {
                  evt.preventDefault();
                  void handleSubmit((payload) => {
                    const form = new FormData();
                    form.append("groups", JSON.stringify(payload.groups));
                    form.append("why", payload.why);
                    form.append("experience", payload.experience);
                    form.append("knowledge", payload.knowledge);
                    form.append("skills", payload.skills);
                    formAction(form);
                  })(evt);
                }}
                className="mt-6 space-y-6"
              >
                {state?.message !== "" && !state.issues && (
                  <div className="text-red-500">{state.message}</div>
                )}
                {state?.issues && (
                  <div className="text-red-500">
                    <ul>
                      {state.issues.map((issue) => (
                        <li key={issue} className="flex gap-1">
                          <X fill="red" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="groups"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Que grupos de voluntarios te interesan?
                  </label>
                  <GroupMultiSelector
                    values={value}
                    onValuesChange={handleMultiSelectorChange}
                    loop={false}
                  />
                  {errors.groups && (
                    <p className="text-red-500">{errors.groups.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="why"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Por qué te gustaría venir?
                  </label>
                  <Textarea
                    id="why"
                    {...register("why")}
                    placeholder="Tu respuesta..."
                    className="w-full"
                  />
                  {errors.why && (
                    <p className="text-red-500">{errors.why.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="experience"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Qué experiencia previa tienes?
                  </label>
                  <Textarea
                    id="experience"
                    {...register("experience")}
                    placeholder="Tu respuesta..."
                    className="w-full"
                  />
                  {errors.experience && (
                    <p className="text-red-500">{errors.experience.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="knowledge"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Qué harás con el conocimiento adquirido?
                  </label>
                  <Textarea
                    id="knowledge"
                    {...register("knowledge")}
                    placeholder="Tu respuesta..."
                    className="w-full"
                  />
                  {errors.knowledge && (
                    <p className="text-red-500">{errors.knowledge.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="skills"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Cuáles son tus habilidades y competencias que puedes
                    aportar al huerto?
                  </label>
                  <Textarea
                    id="skills"
                    {...register("skills")}
                    placeholder="Tu respuesta..."
                    className="w-full"
                  />
                  {errors.skills && (
                    <p className="text-red-500">{errors.skills.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="md: bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]"
                >
                  Enviar Aplicación
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

type MultiSelectorProps = ComponentProps<typeof MultiSelector>;

const GroupMultiSelector = (props: MultiSelectorProps) => {
  return (
    <MultiSelector {...props} loop={false}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Elige los grupos" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options.map((option, i) => (
            <MultiSelectorItem key={i} value={option.value}>
              {option.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};
