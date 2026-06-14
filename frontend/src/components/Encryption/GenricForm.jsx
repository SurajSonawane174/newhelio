import React from "react";
import { Loader2, Save } from "lucide-react";

/* --- Shared Form UI Components --- */
const FieldWrapper = ({ label, children }) => (
  <label className="flex flex-col gap-1 text-sm relative z-10">
    <span className="text-gray-400 font-mono text-xs uppercase tracking-widest">{label}</span>
    {children}
  </label>
);

const inputClass =
  "w-full p-2.5 text-sm rounded bg-[#2a2a3d] text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono relative z-20";

const PrimaryButton = ({ children, type = "button", disabled }) => (
  <button
    type={type}
    disabled={disabled}
    className="flex items-center justify-center gap-2 px-4 py-2 rounded border border-[#7042f88b] bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white font-mono text-xs tracking-widest uppercase hover:bg-[#7042f88b] hover:shadow-[0_0_15px_rgba(112,66,248,0.5)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
  >
    {children}
  </button>
);

const GhostButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center gap-2 px-4 py-2 rounded border border-gray-600 text-gray-300 font-mono text-xs tracking-widest uppercase hover:border-red-500/50 hover:text-red-400 transition-all relative z-20"
  >
    {children}
  </button>
);

/* --- The Main Generic Form --- */
const GenericForm = ({ 
  fields, 
  formData, 
  onChange, 
  onSubmit, 
  onCancel, 
  isSaving, 
  submitLabel = "Execute" 
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 relative z-10">
      {/* Dynamic Field Renderer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => {
          const value = formData[field.name];

          // 1. Checkbox Rendering
          if (field.type === "checkbox") {
            return (
              <label key={field.name} className={`flex items-center gap-3 text-xs font-mono text-cyan-300 tracking-widest uppercase cursor-pointer relative z-20 mt-2 ${field.fullWidth ? "col-span-1 md:col-span-2" : ""}`}>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={!!value}
                  onChange={onChange}
                  className="w-4 h-4 accent-cyan-500"
                />
                {field.label}
              </label>
            );
          }

          // 2. Textarea Rendering
          if (field.type === "textarea") {
            return (
              <div key={field.name} className={field.fullWidth ? "col-span-1 md:col-span-2" : ""}>
                <FieldWrapper label={field.label}>
                  <textarea
                    name={field.name}
                    rows={field.rows || 4}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={inputClass}
                    value={value || ""}
                    onChange={onChange}
                  />
                </FieldWrapper>
              </div>
            );
          }

          // 3. Standard Inputs (text, number, date, email)
          return (
            <div key={field.name} className={field.fullWidth ? "col-span-1 md:col-span-2" : ""}>
              <FieldWrapper label={field.label}>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  required={field.required}
                  disabled={field.disabled}
                  placeholder={field.placeholder}
                  min={field.min}
                  className={`${inputClass} ${field.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                  value={value || ""}
                  onChange={onChange}
                />
              </FieldWrapper>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4 border-t border-white/10 pt-4">
        {onCancel && <GhostButton onClick={onCancel}>Abort</GhostButton>}
        <PrimaryButton type="submit" disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {submitLabel}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default GenericForm;