import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FieldProps } from "formik";

interface RichTextEditorProps extends FieldProps {
  label?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  field,
  form,
  // label,
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    form.setFieldValue(field.name, data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={field.value}
      onChange={handleEditorChange}
      {...props}
    />
  );
};
export default RichTextEditor;
