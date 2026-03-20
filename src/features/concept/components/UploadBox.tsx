import { Text } from '@shared/components/common/Text';
import { CirclePlus } from 'lucide-react';

interface UploadBoxProps {
  label: string;
  hint: string;
  multiple?: boolean;
  onChange: (files: FileList | null) => void;
}

const UploadBox = ({ label, hint, multiple, onChange }: UploadBoxProps) => (
  <div>
    <Text className="block mb-2" variant="caption">
      {label}
    </Text>

    <label className="group border-2 border-dashed border-gray-300 hover:border-pink-400 rounded-2xl p-5 text-center transition-colors cursor-pointer block">
      <input
        type="file"
        hidden
        multiple={multiple}
        accept="image/*"
        onChange={(e) => {
          onChange(e.target.files);
          e.target.value = '';
        }}
      />

      <div className="mx-auto w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-4">
        <CirclePlus
          size={24}
          className="text-gray-400 group-hover:text-pink-500 transition"
        />
      </div>

      <Text variant="caption" color="muted">
        Click to upload or drag and drop
      </Text>

      <Text variant="small" color="pink" className="mt-1">
        {hint}
      </Text>
    </label>
  </div>
);

export default UploadBox;
