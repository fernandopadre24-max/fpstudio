import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useCustomization } from '../context/CustomizationContext';
import { CreditCardModal } from './CreditCardModal';
import { PaymentMethod, CardBrand } from '../types';
import {
  Calendar,
  Clock,
  Mic2,
  Music2,
  Sliders,
  Disc3,
  Radio,
  AudioWaveform,
  Send,
  MessageSquare,
  QrCode,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  Copy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Paperclip,
  X,
  UserCheck,
  User,
  Save,
  Building,
  CreditCard,
  Phone,
  Mail,
  Camera,
  UploadCloud,
  FolderUp,
  RefreshCw,
  Trash2,
  Laptop,
  Eye,
  EyeOff,
  Lock,
  KeyRound,
  Star,
  ArrowLeft,
  Loader2,
  Check,
  Download,
  TrendingUp,
} from 'lucide-react';
import { MapModal } from './MapModal';
import {
  StudioService,
  StudioRoom,
  StudioEquipmentItem,
  BookingRequest,
  ChatMessage,
  PixQuote,
  UserProfile,
} from '../types';
import { formatBRL, formatDateBR, exportReceiptPDF } from '../utils/exportUtils';
import { safeStorage } from '../utils/safeStorage';
import { PIXModal } from './PIXModal';
import { EquipmentView } from './EquipmentView';
import { RECORDING_OPTIONS, FPSTUDIO_EQUIPMENT } from '../data/initialData';
import fpStudioLogo from '../assets/images/fpstudio_logo_1786495953533.jpg';

type BookingMaterial = { id: string; label: string; price: number; categoryGroup: string; sublabel?: string; instrumentName?: string };

const toBookingMaterial = (eq: StudioEquipmentItem): BookingMaterial => ({
  id: eq.id,
  label: eq.title,
  price: eq.price ?? 0,
  categoryGroup: eq.categoryTag,
  sublabel: eq.description,
  instrumentName: eq.title,
});

const getBookingMaterials = (equipmentItems: StudioEquipmentItem[]): BookingMaterial[] =>
  equipmentItems && equipmentItems.length > 0
    ? equipmentItems.map(toBookingMaterial)
    : (RECORDING_OPTIONS as unknown as BookingMaterial[]);

interface ClientViewProps {
  activeClient: UserProfile;
  isClientLoggedIn?: boolean;
  onOpenAuthModal?: (config?: {
    initialTab?: 'studio' | 'client';
    initialIsRegistering?: boolean;
    prefilledClientData?: {
      name?: string;
      email?: string;
      phone?: string;
      bandOrArtistName?: string;
    };
  }) => void;
  onLogoutClient?: () => void;
  services: StudioService[];
  rooms: StudioRoom[];
  bookings: BookingRequest[];
  quotes: PixQuote[];
  chatMessages: ChatMessage[];
  studioInfo: any;
  equipmentItems?: StudioEquipmentItem[];
  onUpdateEquipment?: (item: StudioEquipmentItem) => void;
  onCreateEquipment?: (item: Partial<StudioEquipmentItem>) => void;
  onDeleteEquipment?: (itemId: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestBooking: (data: any) => Promise<any> | void;
  onSendChatMessage: (data: any) => void;
  onDeleteChatMessage?: (messageId: string) => void;
  onUpdateClientProfile?: (updatedData: Partial<UserProfile>) => void;
}

export const ClientView: React.FC<ClientViewProps> = ({
  activeClient,
  isClientLoggedIn = false,
  onOpenAuthModal,
  onLogoutClient,
  services = [],
  rooms = [],
  bookings = [],
  quotes = [],
  chatMessages = [],
  studioInfo = {} as any,
  equipmentItems = [],
  onUpdateEquipment,
  onCreateEquipment,
  onDeleteEquipment,
  activeTab = 'new_booking',
  setActiveTab,
  onRequestBooking,
  onSendChatMessage,
  onDeleteChatMessage,
  onUpdateClientProfile,
}) => {
  const { t } = useCustomization();
  const materials = getBookingMaterials(equipmentItems);
  const materialById = (id: string) => materials.find((m) => m.id === id);
  // New Booking State
  const [selectedService, setSelectedService] = useState<StudioService | undefined>(undefined);
  const [selectedRoom, setSelectedRoom] = useState<StudioRoom | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [instrumentCategoryFilter, setInstrumentCategoryFilter] = useState<string>('todos');
  const [instrumentSearch, setInstrumentSearch] = useState<string>('');
  const instrumentSliderRef = React.useRef<HTMLDivElement>(null);
  const scrollInstruments = (dir: number) => {
    if (instrumentSliderRef.current) {
      instrumentSliderRef.current.scrollBy({ left: dir * 240, behavior: 'smooth' });
    }
  };
  const [tracksCount, setTracksCount] = useState<number>(1);
  // Reference MP3 tracks (guia da música) - max = tracksCount chosen in form
  const [referenceTracks, setReferenceTracks] = useState<{ name: string; dataUrl: string }[]>([]);
  const referenceTrackInputRef = React.useRef<HTMLInputElement>(null);
  const [paymentPlan, setPaymentPlan] = useState<'sinal_50' | 'integral_100'>('sinal_50');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX');
  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);
  const [bookingFormError, setBookingFormError] = useState<string>('');

  // Client Identification fields for the form
  const [bookingClientName, setBookingClientName] = useState<string>(activeClient?.name || '');
  const [bookingBandName, setBookingBandName] = useState<string>(activeClient?.bandOrArtistName || '');
  const [bookingClientPhone, setBookingClientPhone] = useState<string>(activeClient?.phone || '');
  const [bookingClientEmail, setBookingClientEmail] = useState<string>(activeClient?.email || '');

  // Booking Success & PIX Confirmation Modal
  const [bookingSuccessModalData, setBookingSuccessModalData] = useState<{
    booking: BookingRequest;
    quote?: PixQuote;
  } | null>(null);
  const [copiedStudioPix, setCopiedStudioPix] = useState<boolean>(false);
  const [copiedModalPayload, setCopiedModalPayload] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Sync client profile fields when activeClient updates
  React.useEffect(() => {
    if (activeClient) {
      if (activeClient.name && !bookingClientName) setBookingClientName(activeClient.name);
      if (activeClient.bandOrArtistName && !bookingBandName) setBookingBandName(activeClient.bandOrArtistName);
      if (activeClient.phone && !bookingClientPhone) setBookingClientPhone(activeClient.phone);
      if (activeClient.email && !bookingClientEmail) setBookingClientEmail(activeClient.email);
    }
  }, [activeClient]);

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId) ? prev.filter((item) => item !== optionId) : [...prev, optionId]
    );
  };

  // Clear booking form error once all mandatory selections are made
  React.useEffect(() => {
    if (bookingFormError && selectedService && selectedDate && selectedTime) {
      setBookingFormError('');
    }
  }, [selectedService, selectedDate, selectedTime, bookingFormError]);

  // Active Chat Booking Selection
  const [activeBookingIdForChat, setActiveBookingIdForChat] = useState<string>(
    (bookings || []).filter((b) => b.clientId === activeClient?.id)[0]?.id || ''
  );
  const [chatInputText, setChatInputText] = useState<string>('');
  const [pendingAttachment, setPendingAttachment] = useState<{
    name: string;
    fileType: string;
    dataUrl: string;
  } | null>(null);
  const [lightboxAttachment, setLightboxAttachment] = useState<{
    name: string;
    dataUrl: string;
    fileType?: string;
  } | null>(null);
  const [copiedChatPixKey, setCopiedChatPixKey] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const audioInputRef = React.useRef<HTMLInputElement>(null);
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const chatSessionListRef = React.useRef<HTMLDivElement>(null);

  const handleChatFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPendingAttachment({
        name: file.name,
        fileType: file.type.includes('pdf') ? 'pdf' : 'image',
        dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleTrackFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|m4a|aac|ogg|flac)$/i)) {
              alert(t('booking_alert_invalid_audio'));
              return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPendingAttachment({
        name: file.name,
        fileType: 'audio',
        dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  // Select a reference MP3 track (guia da música) for the booking form
  const handleReferenceTrackSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remaining = Math.max(0, tracksCount - referenceTracks.length);
    const toAdd = Array.from(files).slice(0, remaining);

    if (toAdd.length === 0) {
      alert(t('booking_alert_track_limit_reached'));
      e.target.value = '';
      return;
    }

    const existingNames = new Set(referenceTracks.map((track) => track.name.toLowerCase()));
    toAdd.forEach((file) => {
      if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|m4a|aac|ogg|flac)$/i)) {
        alert(t('booking_alert_valid_audio_only'));
        return;
      }
      if (existingNames.has(file.name.toLowerCase())) {
        alert(t('booking_alert_duplicate_track'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setReferenceTracks((prev) => {
          if (prev.length >= tracksCount) return prev;
          return [...prev, { name: file.name, dataUrl }];
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeReferenceTrack = (index: number) => {
    setReferenceTracks((prev) => prev.filter((_, i) => i !== index));
  };

  // Send all reference MP3 tracks as track_submission chat messages for the given booking
  const sendReferenceTracks = (bookingId: string) => {
    const clientName = activeClient?.bandOrArtistName || activeClient?.name || 'Cliente';
    referenceTracks.forEach((track, i) => {
      onSendChatMessage({
        bookingId,
        senderId: activeClient?.id || '',
        senderRole: 'client',
        senderName: clientName,
        message: `🎵 Trilha de referência ${i + 1}: ${track.name}`,
        type: 'track_submission',
        attachment: { name: track.name, fileType: 'audio', dataUrl: track.dataUrl },
      });
    });
    setReferenceTracks([]);
  };

  // Send a track submission message
  const handleSendTrackSubmission = () => {
    if (!pendingAttachment || pendingAttachment.fileType !== 'audio' || !selectedChatBooking) return;
    onSendChatMessage({
      bookingId: selectedChatBooking.id,
      senderId: activeClient?.id || '',
      senderRole: 'client',
      senderName: activeClient?.bandOrArtistName || activeClient?.name || 'Cliente',
      message: `🎵 Trilha de referência enviada: ${pendingAttachment.name}`,
      type: 'track_submission',
      attachment: { ...pendingAttachment },
    });
    setChatInputText('');
    setPendingAttachment(null);
  };

  // Profile Form States
  const [profileName, setProfileName] = useState(activeClient?.name || '');
  const [profileBand, setProfileBand] = useState(activeClient?.bandOrArtistName || '');
  const [profileEmail, setProfileEmail] = useState(activeClient?.email || '');
  const [profilePhone, setProfilePhone] = useState(activeClient?.phone || '');
  const [profileAvatarUrl, setProfileAvatarUrl] = useState(activeClient?.avatarUrl || '');
  const [profilePassword, setProfilePassword] = useState(activeClient?.password || '');
  const [showProfilePassword, setShowProfilePassword] = useState(false);
  const [profilePixKey, setProfilePixKey] = useState(activeClient?.pixKey || '');
  const [profilePixKeyType, setProfilePixKeyType] = useState<'cpf' | 'email' | 'telefone' | 'aleatoria' | string>(activeClient?.pixKeyType || 'cpf');
  const [profileCpf, setProfileCpf] = useState(activeClient?.cpf || '');
  const [profileRg, setProfileRg] = useState(activeClient?.rg || '');
  const [profileAddress, setProfileAddress] = useState(activeClient?.address || '');
  const [profileCity, setProfileCity] = useState(activeClient?.city || '');
  const [profileState, setProfileState] = useState(activeClient?.state || '');
  const [profileCep, setProfileCep] = useState(activeClient?.cep || '');
  const [profileInstagram, setProfileInstagram] = useState(activeClient?.instagram || '');
  const [profileNotes, setProfileNotes] = useState(activeClient?.notes || '');
  const [profileSavedSuccess, setProfileSavedSuccess] = useState(false);
  const [isAvatarDragging, setIsAvatarDragging] = useState(false);
  const [isAvatarProcessing, setIsAvatarProcessing] = useState(false);
  const avatarFileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (activeClient) {
      setProfileName(activeClient.name || '');
      setProfileBand(activeClient.bandOrArtistName || '');
      setProfileEmail(activeClient.email || '');
      setProfilePhone(activeClient.phone || '');
      setProfileAvatarUrl(activeClient.avatarUrl || '');
      setProfilePassword(activeClient.password || '');
      setProfilePixKey(activeClient.pixKey || '');
      setProfilePixKeyType(activeClient.pixKeyType || 'cpf');
      setProfileCpf(activeClient.cpf || '');
      setProfileRg(activeClient.rg || '');
      setProfileAddress(activeClient.address || '');
      setProfileCity(activeClient.city || '');
      setProfileState(activeClient.state || '');
      setProfileCep(activeClient.cep || '');
      setProfileInstagram(activeClient.instagram || '');
      setProfileNotes(activeClient.notes || '');
    }
  }, [activeClient]);

  const processAvatarFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    setIsAvatarProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const raw = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const maxDim = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setProfileAvatarUrl(canvas.toDataURL('image/jpeg', 0.9));
        } else {
          setProfileAvatarUrl(raw);
        }
        setIsAvatarProcessing(false);
      };
      img.onerror = () => {
        setProfileAvatarUrl(raw);
        setIsAvatarProcessing(false);
      };
      img.src = raw;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);

    if (onUpdateClientProfile) {
      onUpdateClientProfile({
        name: profileName,
        bandOrArtistName: profileBand,
        email: profileEmail,
        phone: profilePhone,
        avatarUrl: profileAvatarUrl,
        password: profilePassword,
        pixKey: profilePixKey,
        pixKeyType: profilePixKeyType,
        cpf: profileCpf,
        rg: profileRg,
        address: profileAddress,
        city: profileCity,
        state: profileState,
        cep: profileCep,
        instagram: profileInstagram,
        notes: profileNotes,
      });
    }

    setProfileSavedSuccess(true);

    // After brief success notification, automatically exit profile and return to start (Início)
    setTimeout(() => {
      setProfileSavedSuccess(false);
      setIsSavingProfile(false);
      setActiveTab('new_booking');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 1100);
  };

  // Active PIX Modal
  const [activePixModalQuote, setActivePixModalQuote] = useState<PixQuote | null>(null);
  const [activePixModalBooking, setActivePixModalBooking] = useState<BookingRequest | null>(null);

  // Filter client's bookings
  const clientBookings = (bookings || []).filter((b) => {
    if (!activeClient) return true;
    if (b.clientId && b.clientId === activeClient.id) return true;
    if (activeClient.email && b.clientEmail && b.clientEmail.toLowerCase() === activeClient.email.toLowerCase()) return true;
    if (activeClient.phone && b.clientPhone && b.clientPhone === activeClient.phone) return true;
    if (activeClient.name && b.clientName && b.clientName.toLowerCase() === activeClient.name.toLowerCase()) return true;
    if (activeClient.bandOrArtistName && b.bandOrArtistName && b.bandOrArtistName.toLowerCase() === activeClient.bandOrArtistName.toLowerCase()) return true;
    return false;
  });

  // Get active chat booking & messages
  const selectedChatBooking =
    (bookings || []).find((b) => b.id === activeBookingIdForChat) ||
    clientBookings[0] ||
    (bookings || [])[0];

  const currentChatMsgs = (chatMessages || []).filter((m) => m.bookingId === selectedChatBooking?.id);

  // Auto-scroll chat to latest message
  React.useEffect(() => {
    if (activeTab === 'chat' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChatMsgs.length, selectedChatBooking?.id, activeTab]);

  // Keep active booking synchronized when list changes
  React.useEffect(() => {
    if (!activeBookingIdForChat && clientBookings.length > 0) {
      setActiveBookingIdForChat(clientBookings[0].id);
    }
  }, [clientBookings, activeBookingIdForChat]);

  // Available Time Slots for Room Calendar
  const timeSlots = ['08:00', '10:00', '14:00', '16:00', '18:00', '20:00'];

  // Auto-resume pending booking draft when client registers / logs in
  React.useEffect(() => {
    if (isClientLoggedIn && activeClient?.id) {
      try {
        const savedDraftStr = safeStorage.getItem('fpstudio_pending_booking_draft');
        if (savedDraftStr) {
          const draft = JSON.parse(savedDraftStr);
          safeStorage.removeItem('fpstudio_pending_booking_draft');

          const srv = services.find((s) => s.id === draft.serviceId) || selectedService || services?.[0];
          const bookingPayload = {
            clientId: activeClient.id,
            clientName: activeClient.name || 'Artista / Cliente',
            clientEmail: activeClient.email || '',
            clientPhone: activeClient.phone || '',
            bandOrArtistName: activeClient.bandOrArtistName || activeClient.name || 'Artista',
            serviceId: srv?.id || 'srv-grava-producao',
            roomId: draft.roomId || 'fpstudio',
            roomName: draft.roomName || 'FPStudio Salvador',
            preferredDate: draft.preferredDate,
            startTime: draft.startTime,
            durationHours: draft.durationHours || 2,
            notes: draft.notes,
            totalAmount: draft.totalAmount,
            paymentPlan: draft.paymentPlan || 'sinal_50',
          };

          setIsSubmittingBooking(true);
          Promise.resolve(onRequestBooking(bookingPayload))
            .then((result: any) => {
              try {
                confetti({
                  particleCount: 90,
                  spread: 60,
                  origin: { y: 0.6 },
                });
              } catch (e) {}

              if (result && result.booking) {
                setBookingSuccessModalData({
                  booking: result.booking,
                  quote: result.quote,
                });
                 if (result.booking.id) {
                   setActiveBookingIdForChat(result.booking.id);
                   sendReferenceTracks(result.booking.id);
                 }
              }
            })
            .catch((err) => console.error('Error auto-submitting draft booking:', err))
            .finally(() => setIsSubmittingBooking(false));
        }
      } catch (err) {
        console.warn('Error checking pending booking draft:', err);
      }
    }
  }, [isClientLoggedIn, activeClient?.id]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic2': return <Mic2 className="w-5 h-5" />;
      case 'Sliders': return <Sliders className="w-5 h-5" />;
      case 'Disc3': return <Disc3 className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'AudioWaveform': return <AudioWaveform className="w-5 h-5" />;
      default: return <Music2 className="w-5 h-5" />;
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService) {
      setBookingFormError('Por favor, selecione um serviço para continuar.');
      return;
    }
    if (!selectedDate) {
      setBookingFormError('Por favor, selecione a data do agendamento.');
      return;
    }
    const selectedDay = new Date(selectedDate + 'T12:00:00').getDay();
    if (selectedDay < 2 || selectedDay > 5) {
      setBookingFormError('O estúdio funciona apenas de TERÇA a SEXTA. Selecione outro dia.');
      return;
    }
    if (!selectedTime) {
      setBookingFormError('Por favor, selecione o horário do agendamento.');
      return;
    }

    // If credit card payment method is selected, open the credit card modal
    if (paymentMethod === 'CREDIT_CARD') {
      setShowCreditCardModal(true);
      return;
    }

    const srv = selectedService || services?.[0] || {
      id: 'srv-grava-producao',
      name: 'Gravação & Produção Musical',
      basePrice: 300,
      durationHours: 2,
    };

    const optionsTotal = selectedOptions.reduce((acc, optId) => {
      const opt = materialById(optId);
      return acc + (opt ? opt.price : 0);
    }, 0);

    const perTrackPrice = (srv?.basePrice || 0) + optionsTotal;
    const estimatedTotal = perTrackPrice * tracksCount;
    const signalAmount = Math.round((estimatedTotal / 2) * 100) / 100;

    const optionsDetails = selectedOptions.map((optId) => {
      const opt = materialById(optId);
      if (!opt) return optId;
      return opt.price === 0 ? `${opt.label} (Incluso)` : `${opt.label} (${formatBRL(opt.price)})`;
    });

    const tracksHeader = `Quantidade de Trilhas/Músicas: ${tracksCount} ${tracksCount === 1 ? 'faixa/música' : 'faixas/músicas'}.`;
    const planHeader = paymentPlan === 'sinal_50'
      ? `Condição de Pagamento: Sinal de 50% (${formatBRL(signalAmount)}) para garantia da data + Saldo de 50% (${formatBRL(estimatedTotal - signalAmount)}) no estúdio.`
      : `Condição de Pagamento: Pagamento Integral 100% à vista via PIX (${formatBRL(estimatedTotal)}).`;
    const optionsText = selectedOptions.length > 0 
      ? `Recursos e Instrumentos Selecionados: ${optionsDetails.join(', ')}.\nValor Unitário por Faixa: ${formatBRL(perTrackPrice)}.`
      : `Valor Unitário por Faixa: ${formatBRL(perTrackPrice)}.`;

    const fullNotes = [tracksHeader, planHeader, optionsText, bookingNotes].filter(Boolean).join('\n');

    // VERIFICAÇÃO CRÍTICA DE LOGIN DO CLIENTE:
    // Se NÃO estiver logado como cliente, salva rascunho e vai direto para a tela/modal de cadastro
    if (!isClientLoggedIn || !activeClient?.id) {
      const pendingDraft = {
        serviceId: srv.id,
        roomId: 'fpstudio',
        roomName: 'FPStudio Salvador',
        preferredDate: selectedDate || new Date().toISOString().slice(0, 10),
        startTime: selectedTime || '14:00',
        durationHours: srv.durationHours || 2,
        notes: fullNotes,
        totalAmount: estimatedTotal,
        paymentPlan,
        tracksCount,
        selectedOptions,
      };

      try {
        safeStorage.setItem('fpstudio_pending_booking_draft', JSON.stringify(pendingDraft));
      } catch (err) {}

      if (onOpenAuthModal) {
        onOpenAuthModal({
          initialTab: 'client',
          initialIsRegistering: true,
          prefilledClientData: {
            name: bookingClientName.trim(),
            bandOrArtistName: bookingBandName.trim() || bookingClientName.trim(),
            phone: bookingClientPhone.trim(),
            email: bookingClientEmail.trim(),
          },
        });
      } else {
        setActiveTab('profile');
      }
      return;
    }

    const clientName = (isClientLoggedIn && activeClient?.name) || bookingClientName.trim() || 'Artista / Cliente';
    const bandName = (isClientLoggedIn && activeClient?.bandOrArtistName) || bookingBandName.trim() || clientName;
    const clientPhone = (isClientLoggedIn && activeClient?.phone) || bookingClientPhone.trim() || '(71) 99999-9999';
    const clientEmail = (isClientLoggedIn && activeClient?.email) || bookingClientEmail.trim() || `cliente_${Date.now()}@fpstudio.com`;

    setIsSubmittingBooking(true);

    try {
      const bookingPayload = {
        clientId: activeClient.id,
        clientName,
        clientEmail,
        clientPhone,
        bandOrArtistName: bandName,
        serviceId: srv.id,
        roomId: 'fpstudio',
        roomName: 'FPStudio Salvador',
        preferredDate: selectedDate || new Date().toISOString().slice(0, 10),
        startTime: selectedTime || '14:00',
        durationHours: srv.durationHours || 2,
        notes: fullNotes,
        totalAmount: estimatedTotal,
        paymentPlan,
      };

      const result: any = await onRequestBooking(bookingPayload);

      // Celebratory confetti animation
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.log('Confetti triggered');
      }

      if (result && result.booking) {
        setBookingSuccessModalData({
          booking: result.booking,
          quote: result.quote,
        });
         if (result.booking.id) {
           setActiveBookingIdForChat(result.booking.id);
           sendReferenceTracks(result.booking.id);
         }
      } else {
        const cleanPixKey = studioInfo?.pixKey || '36790486534';
        const isSignal = paymentPlan === 'sinal_50';
        const pixAmount = isSignal ? signalAmount : estimatedTotal;

        const tempBooking: BookingRequest = {
          id: `book-${Date.now()}`,
          clientId: activeClient?.id || 'client-novo',
          clientName,
          clientEmail,
          clientPhone,
          bandOrArtistName: bandName,
          serviceId: srv.id,
          serviceName: srv.name,
          roomId: 'fpstudio',
          roomName: 'FPStudio Salvador',
          preferredDate: selectedDate,
          startTime: selectedTime,
          durationHours: srv.durationHours || 2,
          notes: fullNotes,
          status: 'orcamento_enviado',
          totalAmount: estimatedTotal,
          discountAmount: 0,
          finalAmount: estimatedTotal,
          paymentPlan,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const tempQuote: PixQuote = {
          id: `quote-${Date.now()}`,
          bookingId: tempBooking.id,
          clientId: tempBooking.clientId,
          clientName: tempBooking.bandOrArtistName || tempBooking.clientName,
          serviceName: tempBooking.serviceName,
          totalAmount: estimatedTotal,
          pixKey: cleanPixKey,
          pixKeyType: (studioInfo?.pixKeyType as any) || 'CPF',
          pixPayload: `00020126580014BR.GOV.BCB.PIX0114${cleanPixKey}520400005303986540${pixAmount.toFixed(2)}5802BR5914FERNANDO PADRE6008SALVADOR62070503***6304ABCD`,
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020126580014BR.GOV.BCB.PIX0114${cleanPixKey}`,
          expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          status: 'pending',
          isSignalPayment: isSignal,
          signalAmount: pixAmount,
          paymentPlan,
          notes: isSignal
            ? `Orçamento com opção de Sinal PIX de 50% (${formatBRL(pixAmount)}) para garantia da reserva de horário.`
            : `Orçamento oficial com chave PIX FPStudio gerado com sucesso.`,
        };

        setBookingSuccessModalData({
          booking: tempBooking,
          quote: tempQuote,
        });
        setActiveBookingIdForChat(tempBooking.id);
      }

      setIsSubmittingBooking(false);
      setBookingNotes('');
    } catch (err) {
      console.error('Error submitting booking request:', err);
      setIsSubmittingBooking(false);
    }
  };

  const handleSendTextChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!chatInputText.trim() && !pendingAttachment) || !selectedChatBooking) return;

    onSendChatMessage({
      bookingId: selectedChatBooking.id,
      senderId: activeClient?.id || '',
      senderRole: 'client',
      senderName: activeClient?.bandOrArtistName || activeClient?.name || 'Cliente',
      message:
        chatInputText.trim() ||
        (pendingAttachment
          ? pendingAttachment.fileType === 'audio'
            ? `🎵 Trilha de referência enviada: ${pendingAttachment.name}`
            : 'Comprovante de pagamento PIX enviado!'
          : ''),
      type: pendingAttachment
        ? pendingAttachment.fileType === 'audio'
          ? 'track_submission'
          : 'receipt'
        : 'text',
      attachment: pendingAttachment ? { ...pendingAttachment } : undefined,
    });

    setChatInputText('');
    setPendingAttachment(null);
  };

  const handleOpenPixModal = (booking: BookingRequest) => {
    let quote = quotes.find((q) => q.bookingId === booking.id);
    if (!quote) {
      // Fallback quote generation if not in store
      quote = {
        id: `quote-fb-${booking.id}`,
        bookingId: booking.id,
        clientId: booking.clientId,
        clientName: booking.clientName,
        serviceName: booking.serviceName,
        totalAmount: booking.finalAmount || booking.totalAmount,
        pixKey: '36790486534',
        pixKeyType: 'CPF',
        pixPayload: `00020101021226830014br.gov.bcb.pix0136fpstudio.pagamentos@pix.com.br520400005303986540${(booking.finalAmount || booking.totalAmount).toFixed(2)}5802BR5920FPSTUDIO PRODUCOES6009SAO PAULO62070503***6304FB72`,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021226830014br.gov.bcb.pix0136fpstudio.pagamentos@pix.com.br520400005303986540${(booking.finalAmount || booking.totalAmount).toFixed(2)}5802BR5920FPSTUDIO PRODUCOES6009SAO PAULO62070503***6304FB72`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: booking.status === 'pago_confirmado' ? 'confirmed' : 'pending',
        notes: `Orçamento oficial para ${booking.serviceName} (${booking.durationHours}h)`,
      };
    }
    setActivePixModalQuote(quote);
    setActivePixModalBooking(booking);
  };

  const handleGoToServicos = () => {
    setActiveTab('new_booking');
    setTimeout(() => {
      const el = document.getElementById('servicos-desejados');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSendReceiptFromModal = (fileDataUrl: string, fileName: string) => {
    if (!activePixModalBooking) return;

    const bId = activePixModalBooking.id;
    setActiveBookingIdForChat(bId);

    onSendChatMessage({
      bookingId: bId,
      senderId: activeClient?.id || '',
      senderRole: 'client',
      senderName: activeClient?.bandOrArtistName || activeClient?.name || 'Cliente',
      message: `Comprovante de pagamento PIX anexado com sucesso! (${fileName})`,
      type: 'receipt',
      attachment: {
        name: fileName,
        fileType: 'image',
        dataUrl: fileDataUrl,
      },
    });

    setActiveTab('chat');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Hero Banner matching exact style from user screenshot */}
      <div className="relative overflow-hidden bg-[#0a0a0d] border-b border-zinc-800/80 text-white py-10 px-4 sm:px-6 lg:px-8">
        {/* Subtle radial background glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00FF41]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Main Hero Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={fpStudioLogo}
                    alt="FPStudio Logo"
                    referrerPolicy="no-referrer"
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover border-2 border-[#00FF41] shadow-[0_0_35px_rgba(0,255,65,0.4)] ring-4 ring-[#00FF41]/20"
                  />
                  <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#00FF41] text-black font-black text-[10px] uppercase tracking-wider shadow-lg">
                    Salvador
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#00FF41] text-xs font-black uppercase tracking-wider">
                      {t('hero_producer_role')}
                    </span>
                    <span className="text-zinc-400 text-xs font-bold">
                      • {t('hero_location')}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1 leading-tight">
                    PRODUÇÃO MUSICAL, GRAVAÇÃO & <span className="text-[#00FF41] drop-shadow-[0_0_15px_rgba(0,255,65,0.4)]">VÍDEO</span>
                  </h1>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed max-w-2xl">
                {t('hero_subtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleGoToServicos}
                  className="px-6 py-3.5 rounded-full bg-[#00FF41] hover:bg-[#00e038] text-black font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(0,255,65,0.4)] hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>⚡ {t('hero_btn_instrument_budget')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleGoToServicos}
                  className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm border border-zinc-700/80 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>👁️ {t('hero_btn_view_schedule')}</span>
                </button>

                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="px-4 py-3.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs border border-zinc-800 transition flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#00FF41]" />
                  <span>{t('hero_btn_view_map')}</span>
                </button>
              </div>

              {/* Feature Badges under Hero */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#00FF41]/10 text-[#00FF41]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{t('hero_producer_name')}</p>
                    <p className="text-[10px] text-zinc-400 font-semibold">{t('hero_producer_role')}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#00FF41]/10 text-[#00FF41]">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{t('hero_feature_vocal_tuning')}</p>
                    <p className="text-[10px] text-zinc-400 font-semibold">{t('hero_feature_tuning_tools')}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#00FF41]/10 text-[#00FF41]">
                    <Music2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{t('hero_feature_mix_master')}</p>
                    <p className="text-[10px] text-zinc-400 font-semibold">{t('hero_feature_streaming_ready')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Card: Spaces & Room Cards */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-[#111115] border border-zinc-800 shadow-2xl space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#00FF41]">
                      {t('hero_room_section_label')}
                    </span>
                    <h3 className="text-base font-black text-white">{t('hero_studio_name_heading')} {t('hero_location')}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00FF41]/15 text-[#00FF41] border border-[#00FF41]/30 text-[10px] font-black uppercase tracking-wider">
                    {t('hero_available_badge')}
                  </span>
                </div>

                {/* Highlight: Pro-Tools (INCLUSO) */}
                <div
                  onClick={handleGoToServicos}
                  className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#00FF41]/60 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00FF41]" />
                      <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#00FF41] transition">
                        {t('hero_feature_protools')}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-400">{t('hero_feature_protools_desc')}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00FF41]/20 text-[#00FF41] font-black text-[11px] border border-[#00FF41]/40 shrink-0">
                    {t('hero_included_badge')}
                  </span>
                </div>

                {/* Highlight: Microfone (Incluso) */}
                <div
                  onClick={handleGoToServicos}
                  className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#00FF41]/60 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00FF41]" />
                      <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#00FF41] transition">
                        {t('hero_feature_microphone')}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-400">{t('hero_feature_microphone_desc')}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00FF41]/20 text-[#00FF41] font-black text-[11px] border border-[#00FF41]/40 shrink-0">
                    {t('hero_included_badge_2')}
                  </span>
                </div>

                {/* Highlight: Placa de Áudio (Incluso) */}
                <div
                  onClick={handleGoToServicos}
                  className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#00FF41]/60 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00FF41]" />
                      <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#00FF41] transition">
                        {t('hero_feature_audio_interface')}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-400">{t('hero_feature_audio_interface_desc')}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00FF41]/20 text-[#00FF41] font-black text-[11px] border border-[#00FF41]/40 shrink-0">
                    {t('hero_included_badge_3')}
                  </span>
                </div>

                {/* Bottom link to Chat */}
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-zinc-400 border-t border-zinc-800/80">
                  <span>{t('hero_doubts_text')}</span>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="text-[#00FF41] hover:underline font-black flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t('hero_studio_chat_link')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Section Header: Infrastructure & Gear */}
          <div className="pt-8 border-t border-zinc-800/80 text-center space-y-3 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 text-xs font-black uppercase tracking-wider">
              🎧 INFRAESTRUTURA DE ALTO PADRÃO
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ESPAÇOS & EQUIPAMENTOS DO ESTÚDIO
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              Ambiente acusticamente tratado, tratamento contra reflexões e microfonação de ponta operados diretamente pelo músico e produtor Fernando Padre.
            </p>
          </div>

        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="bg-[#0a0a0d] border-b border-zinc-800/80 relative z-10 px-3 sm:px-4 py-2 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 py-0.5 shrink-0">
            <button
              onClick={handleGoToServicos}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'new_booking'
                  ? 'bg-[#00FF41] text-black font-black shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('btn_agendar')}</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#00FF41] text-black font-black shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>{t('nav_my_orders')}</span>
              {clientBookings.length > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  activeTab === 'bookings' ? 'bg-black text-[#00FF41]' : 'bg-[#00FF41]/20 text-[#00FF41]'
                }`}>
                  {clientBookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('services_equipment')}
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'services_equipment' || activeTab === 'services' || activeTab === 'equipment'
                  ? 'bg-[#00FF41] text-black font-black shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Music2 className="w-3.5 h-3.5 shrink-0" />
              <span className="flex flex-col text-left leading-[1.1]">
                <span className="font-black text-xs">{t('tabs_services')}</span>
                <span className={`text-[9.5px] font-bold ${
                  activeTab === 'services_equipment' || activeTab === 'services' || activeTab === 'equipment' ? 'opacity-85' : 'text-zinc-400'
                }`}>& Material</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-[#00FF41] text-black font-black shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>{t('nav_reviews')}</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-[#00FF41] text-black font-black shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t('tabs_chat')}</span>
              {currentChatMsgs.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-ping" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              title={t('nav_profile')}
              className={`p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center justify-center whitespace-nowrap cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#00FF41] text-black font-black shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <UserCheck className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs text-zinc-400 shrink-0">
            <span className="text-zinc-500">Cliente:</span>
            <span className="font-bold text-white bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800 flex items-center gap-1.5 max-w-[200px] truncate">
              <span className="truncate">{activeClient?.bandOrArtistName || activeClient?.name || t('booking_draft_default_client_name')}</span>
              {activeClient?.cpf && (
                <span className="text-[9px] text-[#00FF41] font-mono px-1 py-0.5 rounded bg-[#00FF41]/10 border border-[#00FF41]/30 shrink-0">
                  {t('tabs_cpf_ok')}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= TAB 1: NOVO AGENDAMENTO ONLINE ================= */}
        {activeTab === 'new_booking' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Catalog of Services & Studio Rooms */}
            <div id="servicos-desejados" className="lg:col-span-7 space-y-6 scroll-mt-28">
              
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Music2 className="w-6 h-6 text-[#00FF41]" /> Serviços Desejados & Simulação de Orçamento
                </h2>
                <p className="text-xs text-zinc-400">
                  Selecione o serviço e os instrumentos/opções de gravação desejadas para recalcular o orçamento em tempo real
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(services || []).map((srv) => {
                  const isSelected = selectedService?.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => {
                        setSelectedService(srv);
                      }}
                      className={`overflow-hidden rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500 shadow-xl shadow-emerald-500/10 dark:bg-emerald-950/30'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {srv.imageUrl ? (
                        <div className="relative h-28 w-full overflow-hidden bg-slate-950">
                          <img
                            src={srv.imageUrl}
                            alt={srv.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2.5">
                            <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                              {getServiceIcon(srv.iconName)}
                              <span className="capitalize">{srv.category || 'Serviço'}</span>
                            </span>
                            <span className="text-xs font-black text-emerald-400 bg-black/70 px-2 py-0.5 rounded">
                              {formatBRL(srv.basePrice)}
                            </span>
                          </div>
                        </div>
                      ) : null}

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {!srv.imageUrl && (
                            <div className="flex items-center justify-between mb-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                                isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}>
                                {getServiceIcon(srv.iconName)}
                              </div>
                              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-1 rounded-full">
                                {formatBRL(srv.basePrice)}
                              </span>
                            </div>
                          )}

                          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                            {srv.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {srv.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-emerald-500" /> {srv.durationHours}h de sessão
                          </span>
                          <span className="font-medium text-emerald-500/80">FPStudio Salvador</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FPStudio Equipment Showcase */}
              <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-[#00FF41] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#00FF41]" /> {t('booking_equipment_heading')}
                  </h4>
                  <span className="text-[10px] bg-[#00FF41]/20 text-[#00FF41] px-2 py-0.5 rounded font-bold border border-[#00FF41]/30">{t('booking_recording_editing_badge')}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  {FPSTUDIO_EQUIPMENT.map((eq, i) => (
                    <div key={i} className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                      <p className="text-[9px] text-indigo-400 font-bold uppercase">{eq.category}</p>
                      <p className="font-semibold text-white truncate mt-0.5">{eq.item}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Schedule Calendar & Request Form */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
              
              {/* Service Header Badge */}
              <div className="bg-slate-950 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#00FF41] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('booking_selected_service_label')}</span>
                  </div>
                  <h3 className="font-bold text-base text-white leading-tight mt-0.5">{selectedService?.name || t('booking_select_service_default')}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{t('hero_studio_name_heading')} {t('hero_location')} • {t('booking_session_info')} ({selectedService?.durationHours || 2}h)</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">{t('booking_base_price_label')}</span>
                  <p className="text-xl font-black text-[#00FF41]">{formatBRL(selectedService?.basePrice || 0)}</p>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                {/* 1. Client Identification Section */}
                <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-[#00FF41]" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {t('booking_client_id_section')}
                      </span>
                    </div>
                    {isClientLoggedIn ? (
                      <span className="text-[10px] bg-[#00FF41]/15 text-[#00FF41] border border-[#00FF41]/30 px-2 py-0.5 rounded-full font-bold">
                        {t('booking_connected_profile_badge')}
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                        {t('booking_registration_required_badge')}
                      </span>
                    )}
                  </div>

                  {isClientLoggedIn ? (
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div>
                        <p className="font-black text-slate-900 dark:text-white">
                          {activeClient?.bandOrArtistName || activeClient?.name || 'Artista Conectado'}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {activeClient?.phone ? `WhatsApp: ${activeClient.phone}` : activeClient?.email}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('profile')}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                      >
                        {t('booking_my_registration_btn')}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5 pt-1">
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-300 text-[11px] flex items-start gap-2">
                        <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-amber-200">{t('booking_login_required_heading')}</p>
                          <p className="text-amber-300/80 text-[10px] mt-0.5">
                            {t('booking_registration_instructions')}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenAuthModal) {
                              onOpenAuthModal({
                                initialTab: 'client',
                                initialIsRegistering: true,
                                prefilledClientData: {
                                  name: bookingClientName.trim(),
                                  bandOrArtistName: bookingBandName.trim() || bookingClientName.trim(),
                                  phone: bookingClientPhone.trim(),
                                  email: bookingClientEmail.trim(),
                                },
                              });
                            }
                          }}
                          className="py-2 px-2 bg-[#00FF41]/15 hover:bg-[#00FF41]/25 text-[#00FF41] border border-[#00FF41]/30 font-bold rounded-lg text-[11px] transition text-center flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Cadastrar Artista</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenAuthModal) {
                              onOpenAuthModal({
                                initialTab: 'client',
                                initialIsRegistering: false,
                              });
                            }
                          }}
                          className="py-2 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-lg text-[11px] transition text-center flex items-center justify-center gap-1.5"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Já Tenho Login</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">
                            Nome do Responsável
                          </label>
                          <input
                            type="text"
                            value={bookingClientName}
                            onChange={(e) => setBookingClientName(e.target.value)}
                            placeholder="Seu Nome Completo"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#00FF41]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">
                            WhatsApp / Telefone
                          </label>
                          <input
                            type="text"
                            value={bookingClientPhone}
                            onChange={(e) => setBookingClientPhone(e.target.value)}
                            placeholder="(71) 99999-8888"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#00FF41]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">
                            Nome Artístico / Banda
                          </label>
                          <input
                            type="text"
                            value={bookingBandName}
                            onChange={(e) => setBookingBandName(e.target.value)}
                            placeholder="Ex: Banda Solstício"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#00FF41]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">
                            E-mail
                          </label>
                          <input
                            type="email"
                            value={bookingClientEmail}
                            onChange={(e) => setBookingClientEmail(e.target.value)}
                            placeholder="artista@email.com"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#00FF41]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Date Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Data da Sessão de Gravação:
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().slice(0, 10)}
                    value={selectedDate}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedDate(val);
                      if (val) {
                        const day = new Date(val + 'T12:00:00').getDay();
                        if (day < 2 || day > 5) {
                          setBookingFormError('O estúdio funciona apenas de TERÇA a SEXTA. Selecione outro dia.');
                          setSelectedDate('');
                        } else {
                          setBookingFormError('');
                        }
                      }
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="mt-2 flex items-start gap-2 bg-red-100 dark:bg-red-950/60 border border-red-400 dark:border-red-700 rounded-lg px-3 py-2 animate-pulse">
                    <span className="text-red-600 dark:text-red-400 font-black">⚠️</span>
                    <p className="text-[11px] font-bold text-red-700 dark:text-red-300 leading-tight">
                      Funcionamento: apenas de <strong>TERÇA a SEXTA</strong>. Segunda, Sábado e Domingo o estúdio está fechado.
                    </p>
                  </div>
                </div>

                {/* 3. Time Slots Grid */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Horários de Gravação Disponíveis:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => {
                      const isBooked = bookings.some(
                        (b) => b.preferredDate === selectedDate && b.startTime === time && b.status !== 'cancelado'
                      );
                      const isSelected = selectedTime === time;

                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                            isBooked
                              ? 'bg-slate-100 dark:bg-slate-800/40 text-slate-400 line-through cursor-not-allowed opacity-50'
                              : isSelected
                              ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          <Clock className="w-3 h-3" /> {time}
                          {isBooked && <span className="text-[9px] text-red-400 font-normal ml-0.5">(Ocupado)</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Tracks Quantity Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t('booking_label_track_count')}:
                    </label>
                    <span className="text-[10px] text-indigo-500 font-semibold">Defina o nº de faixas</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTracksCount((prev) => Math.max(1, prev - 1))}
                        className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-black text-base shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95 transition flex items-center justify-center border border-slate-200 dark:border-slate-600"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={tracksCount}
                        onChange={(e) => setTracksCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-14 text-center font-black text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg py-1 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setTracksCount((prev) => Math.min(50, prev + 1))}
                        className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-black text-base shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95 transition flex items-center justify-center border border-slate-200 dark:border-slate-600"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {[1, 2, 3, 5, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTracksCount(num)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                            tracksCount === num
                              ? 'bg-indigo-600 text-white shadow-sm font-black'
                              : 'bg-white dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600/50'
                          }`}
                        >
                          {num} {num === 1 ? t('booking_track_singular') : t('booking_track_plural')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4b. Reference MP3 Tracks (Guia da Música) - below track selector */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t('booking_label_reference_tracks')}
                    </label>
                    <span className="text-[10px] text-fuchsia-500 font-semibold">
                      {t('booking_reference_tracks_sent')} {referenceTracks.length}/{tracksCount}
                    </span>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => referenceTrackInputRef.current?.click()}
                        disabled={referenceTracks.length >= tracksCount}
                        className={`px-3 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer border ${
                          referenceTracks.length >= tracksCount
                            ? 'bg-zinc-300 dark:bg-slate-700 text-zinc-500 dark:text-slate-400 border-zinc-200 dark:border-slate-600 cursor-not-allowed'
                            : 'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/40 hover:bg-fuchsia-500/25'
                        }`}
                        title={t('booking_label_reference_tracks')}
                      >
                        <Mic2 className="w-4 h-4" /> {referenceTracks.length >= tracksCount ? t('booking_limit_reached') : t('btn_add_included')}
                      </button>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                        {t('booking_reference_tracks_hint')}
                      </span>
                    </div>

                    {referenceTracks.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {referenceTracks.map((track, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-2 bg-white dark:bg-slate-900 rounded-lg px-2.5 py-1.5 border border-fuchsia-500/30">
                            <div className="flex items-center gap-2 min-w-0">
                              <Music2 className="w-4 h-4 text-fuchsia-400 shrink-0" />
                              <audio controls preload="none" src={track.dataUrl} className="h-8 max-w-[180px] sm:max-w-[260px]" />
                              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate">{track.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeReferenceTrack(idx)}
                              className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition cursor-pointer"
                              title="Remover trilha"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={referenceTrackInputRef}
                    onChange={handleReferenceTrackSelect}
                    accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac"
                    multiple
                    className="hidden"
                  />
                </div>

                {/* 5. Recording Options & Instruments Categorized Selection */}
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                    <div>
                      <label className="block text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#00FF41]" />
                        {t('booking_label_instruments_processing')}
                      </label>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {t('booking_instruments_subtitle')}
                      </p>
                    </div>
                    
                    {/* Quick combo buttons */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const includedIds = materials.filter((o) => o.price === 0).map((o) => o.id);
                          setSelectedOptions((prev) => Array.from(new Set([...prev, ...includedIds])));
                        }}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#00FF41]/15 text-[#00FF41] border border-[#00FF41]/30 hover:bg-[#00FF41]/25 transition cursor-pointer"
                        title="Incluir Pro-Tools, microfone Kadosh 412, placa e caixas"
                      >
                        + Inclusos (Grátis)
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const comboRock = ['eq-guitarras', 'eq-baixos', 'eq-bateria', 'eq-violino'].filter((id) => materials.some((m) => m.id === id));
                          setSelectedOptions(comboRock);
                        }}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/25 transition cursor-pointer"
                        title="Guitarra + Baixo + Bateria + Violino"
                      >
                        + Combo Banda
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const comboForro = ['eq-sanfona', 'eq-violoes', 'eq-baixos', 'eq-percussao'].filter((id) => materials.some((m) => m.id === id));
                          setSelectedOptions(comboForro);
                        }}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition cursor-pointer"
                        title="Sanfona + Violão + Baixo + Percussão"
                      >
                        + Combo Forró/Sertanejo
                      </button>

                      {selectedOptions.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedOptions([])}
                          className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-400 transition cursor-pointer"
                        >
                          Limpar
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Filter Pills & Search */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: 'todos', label: t('booking_category_all') },
                      ...materials
                        .filter((o) => o.categoryGroup && o.price > 0)
                        .map((o) => o.categoryGroup)
                        .filter((cat, i, arr) => arr.indexOf(cat) === i)
                        .map((cat) => ({ id: cat, label: cat })),
                    ].map((cat) => {
                      const isActive = instrumentCategoryFilter === cat.id;
                      const countInCat = cat.id === 'todos'
                        ? materials.filter((o) => o.price > 0).length
                        : materials.filter((o) => o.categoryGroup === cat.id && o.price > 0).length;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setInstrumentCategoryFilter(cat.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                            isActive
                              ? 'bg-[#00FF41] text-slate-950 shadow-sm font-black'
                              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60'
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                            isActive ? 'bg-slate-950 text-[#00FF41]' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                          }`}>
                            {countInCat}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Instruments Horizontal Slider */}
                  {(() => {
                    const validOptions = materials.filter((o) => Boolean(o.categoryGroup) && o.price > 0);
                    const filteredOptions = validOptions.filter((o) => {
                      const matchesCategory = instrumentCategoryFilter === 'todos' || o.categoryGroup === instrumentCategoryFilter;
                      const matchesSearch = !instrumentSearch.trim() ||
                        o.label.toLowerCase().includes(instrumentSearch.toLowerCase()) ||
                        (o.instrumentName && o.instrumentName.toLowerCase().includes(instrumentSearch.toLowerCase())) ||
                        (o.sublabel && o.sublabel.toLowerCase().includes(instrumentSearch.toLowerCase()));
                      return matchesCategory && matchesSearch;
                    });

                    return (
                      <div className="relative">
                        {filteredOptions.length > 0 && (
                          <>
                            <button
                              type="button"
                              onClick={() => scrollInstruments(-1)}
                              aria-label="Rolar para a esquerda"
                              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-9 rounded-r-lg bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => scrollInstruments(1)}
                              aria-label="Rolar para a direita"
                              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-9 rounded-l-lg bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <div
                          ref={instrumentSliderRef}
                          className="flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pt-0.5 px-1 no-scrollbar"
                        >
                          {filteredOptions.map((opt) => {
                            const isSelected = selectedOptions.includes(opt.id);
                            const isIncluded = opt.price === 0;

                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => toggleOption(opt.id)}
                                className={`snap-start shrink-0 w-[210px] p-3 rounded-xl text-left border transition flex flex-col items-start justify-between gap-2.5 cursor-pointer group ${
                                  isSelected
                                    ? isIncluded
                                      ? 'bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white shadow-[0_0_12px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40'
                                      : 'bg-[#00FF41]/10 border-[#00FF41] text-slate-900 dark:text-white shadow-[0_0_12px_rgba(0,255,65,0.15)] ring-1 ring-[#00FF41]/40'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                                }`}
                              >
                                <div className="flex items-start gap-2.5 min-w-0 flex-1 w-full">
                                  <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center border shrink-0 transition ${
                                    isSelected
                                      ? isIncluded
                                        ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                                        : 'bg-[#00FF41] border-[#00FF41] text-slate-950'
                                      : 'border-slate-400 dark:border-slate-600 group-hover:border-slate-300'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className={`text-xs font-black leading-tight ${
                                        isSelected
                                          ? isIncluded ? 'text-emerald-400' : 'text-[#00FF41]'
                                          : 'text-slate-800 dark:text-white'
                                      }`}>
                                        {opt.label}
                                      </span>
                                      {opt.categoryGroup && (
                                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                                          {opt.categoryGroup}
                                        </span>
                                      )}
                                    </div>

                                    {opt.sublabel && (
                                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
                                        {opt.sublabel}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="shrink-0 w-full">
                                  <span className={`px-2 py-0.5 rounded-lg text-xs font-mono font-black ${
                                    isIncluded
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] uppercase'
                                      : isSelected
                                      ? 'bg-[#00FF41] text-slate-950'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                                  }`}>
                                    {isIncluded ? 'Incluso' : `+${formatBRL(opt.price)}`}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 6. Payment Method Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('payment_method_label')}:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('PIX')}
                      className={`p-3 rounded-xl text-left border transition ${
                        paymentMethod === 'PIX'
                          ? 'bg-[#00FF41]/10 border-[#00FF41] text-white shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                          : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📱</span>
                        <div>
                          <p className="text-xs font-black">{t('payment_method_pix')}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('payment_method_pix_desc')}</p>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CREDIT_CARD')}
                      className={`p-3 rounded-xl text-left border transition ${
                        paymentMethod === 'CREDIT_CARD'
                          ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                          : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">💳</span>
                        <div>
                          <p className="text-xs font-black">{t('payment_method_credit_card')}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('payment_method_credit_card_desc')}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 6b. Payment Plan Selection (PIX only) */}
                {paymentMethod === 'PIX' && (<div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('booking_label_payment_plan')}:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentPlan('sinal_50')}
                      className={`p-3 rounded-xl text-left border transition ${
                        paymentPlan === 'sinal_50'
                          ? 'bg-[#00FF41]/10 border-[#00FF41] text-white shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                          : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase text-[#00FF41]">{t('booking_payment_plan_signal')}</span>
                        <span className="text-[9px] bg-[#00FF41]/20 text-[#00FF41] px-1.5 py-0.5 rounded font-bold">{t('booking_recommended_badge')}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                        50% agora + 50% na sessão
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Garante o horário na agenda
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentPlan('integral_100')}
                      className={`p-3 rounded-xl text-left border transition ${
                        paymentPlan === 'integral_100'
                          ? 'bg-[#00FF41]/10 border-[#00FF41] text-white shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                          : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase text-indigo-400">{t('booking_payment_plan_full')}</span>
                        <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-bold">À Vista</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                        100% à vista via PIX
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Quitação total imediata
                      </p>
                    </button>
                  </div>
                </div>
                )}

                {/* 7. Estimated Price & PIX Breakdown Box */}
                {(() => {
                  const optSum = selectedOptions.reduce((acc, optId) => acc + (materialById(optId)?.price || 0), 0);
                  const unitPrice = (selectedService?.basePrice || 0) + optSum;
                  const totalSum = unitPrice * tracksCount;
                  const signal50 = Math.round((totalSum / 2) * 100) / 100;

                  return (
                    <div className="bg-slate-950 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Serviço Base ({selectedService?.name || 'Serviço'}):</span>
                        <span className="font-semibold text-white">{formatBRL(selectedService?.basePrice || 0)}</span>
                      </div>

                      {selectedOptions.length > 0 && (
                        <div className="space-y-1.5 pt-1.5 border-t border-slate-800/80">
                          <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                            <span>Adicionais por Faixa ({selectedOptions.length} itens):</span>
                            <span className="text-[#00FF41]">+ {formatBRL(optSum)}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                            {selectedOptions.map((optId) => {
                              const opt = materialById(optId);
                              if (!opt) return null;
                              return (
                                <span key={opt.id} className="text-[10px] bg-slate-900 text-emerald-300 px-2 py-0.5 rounded-md border border-slate-800 flex items-center gap-1">
                                  <span>{opt.label}</span>
                                  <span className="font-mono text-[#00FF41] font-bold">
                                    {opt.price === 0 ? '(Incluso)' : `+${formatBRL(opt.price)}`}
                                  </span>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-xs text-indigo-300">
                          <span className="font-semibold">{t('booking_label_unit_price')}:</span>
                          <span className="font-bold text-white">{formatBRL(unitPrice)}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-indigo-300">
                          <span className="font-semibold">{t('booking_label_track_quantity')}:</span>
                          <span className="font-black text-indigo-400">× {tracksCount} {tracksCount === 1 ? t('booking_track_singular') : t('booking_track_plural')}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">{t('booking_label_total_project')}:</span>
                        <span className="text-base font-black text-white">{formatBRL(totalSum)}</span>
                      </div>

                      {/* Highlighted Payment Requirement */}
                      <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 rounded-lg p-2.5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#00FF41] font-black uppercase tracking-wider block">
                            {paymentPlan === 'sinal_50' ? t('booking_pix_value_label') + ' (50%)' : t('booking_pix_value_label') + ' (100%)'}
                          </span>
                          <span className="text-xs text-slate-300">
                            {paymentPlan === 'sinal_50' ? t('booking_payment_plan_signal_hint') : t('booking_payment_plan_full_hint')}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-[#00FF41]">
                            {formatBRL(paymentPlan === 'sinal_50' ? signal50 : totalSum)}
                          </span>
                        </div>
                      </div>

                      {/* Official FPStudio PIX Key Info */}
                      <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <QrCode className="w-3.5 h-3.5 text-[#00FF41]" />
                          <span>Chave PIX: <strong className="text-white font-mono">36790486534</strong> (CPF)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('36790486534');
                            setCopiedStudioPix(true);
                            setTimeout(() => setCopiedStudioPix(false), 2500);
                          }}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[#00FF41] rounded text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          {copiedStudioPix ? <Check className="w-3 h-3 text-[#00FF41]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedStudioPix ? 'Copiado!' : 'Copiar Chave'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* 8. Custom Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Detalhes do Projeto / Observações:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Gravaremos 2 faixas com metrônomo a 120BPM, levaremos guitarra própria..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* 9. Submit Button */}
                {bookingFormError && (
                  <div className="p-3 bg-red-600 border-2 border-red-300 rounded-xl text-white text-[11px] font-black flex items-start gap-2 animate-pulse shadow-lg">
                    <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{bookingFormError}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="w-full py-4 bg-[#00FF41] hover:bg-[#00e038] disabled:opacity-80 text-black font-black rounded-xl shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  {isSubmittingBooking ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t('booking_btn_submitting')}</span>
                    </>
                  ) : isClientLoggedIn ? (
                    <>
                      <Calendar className="w-5 h-5" />
                      <span>{t('btn_request_booking').toUpperCase()}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>{t('btn_register_to_book').toUpperCase()}</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-400">
                  {isClientLoggedIn
                    ? 'Ao clicar, seu agendamento é registrado e o código PIX é gerado automaticamente com atendimento em tempo real pelo Chat.'
                    : 'Ao clicar, você será direcionado para o cadastro rápido do artista (com PIN de 4 dígitos) para confirmar o agendamento e emitir seu PIX.'}
                </p>

              </form>

            </div>

          </div>
        )}

        {/* ================= TAB 2: MEUS AGENDAMENTOS E ORÇAMENTOS ================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Meus Agendamentos & Status de PIX
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Acompanhe seus horários de gravação e efetue pagamentos pendentes
                </p>
              </div>

              <button
                onClick={() => setActiveTab('new_booking')}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                + Novo Agendamento
              </button>
            </div>

            {clientBookings.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl p-5 shadow-lg">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Total dos Pedidos
                      </span>
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {formatBRL(clientBookings.reduce((sum, b) => sum + (b.finalAmount || 0), 0))}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {clientBookings.length} pedido{clientBookings.length === 1 ? '' : 's'}
                      </span>
                      <span className="text-2xl font-black text-slate-900 dark:text-white">
                        {clientBookings.filter((b) => b.status === 'pago_confirmado').length} pago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {clientBookings.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
                <Music2 className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="font-bold text-slate-700 dark:text-slate-300">Nenhum agendamento encontrado</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Você ainda não possui horários reservados neste perfil de artista/banda.
                </p>
                <button
                  onClick={() => setActiveTab('new_booking')}
                  className="px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow"
                >
                  Reservar Primeiro Horário
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientBookings.map((b) => {
                  const quote = quotes.find((q) => q.bookingId === b.id);
                  const isPaid = b.status === 'pago_confirmado';
                  const isQuoted = b.status === 'orcamento_enviado';
                  const isReceiptSent = b.status === 'comprovante_enviado';

                  return (
                    <div
                      key={b.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Código: {b.id}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 ${
                              isPaid
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400'
                                : isReceiptSent
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400'
                                : isQuoted
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-400'
                                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            {isPaid ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" /> Pago & Confirmado
                              </>
                            ) : isReceiptSent ? (
                              <>
                                <Upload className="w-3.5 h-3.5" /> Comprovante em Análise
                              </>
                            ) : isQuoted ? (
                              <>
                                <QrCode className="w-3.5 h-3.5" /> Aguardando PIX
                              </>
                            ) : (
                              <>
                                <Clock className="w-3.5 h-3.5" /> Em Análise no Estúdio
                              </>
                            )}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                            {b.serviceName}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            FPStudio Salvador • {b.durationHours}h de sessão
                          </p>
                        </div>

                         <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Data & Horário:</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {formatDateBR(b.preferredDate)} às {b.startTime}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Valor Final:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              {formatBRL(b.finalAmount)}
                            </span>
                          </div>
                         </div>

                         {b.isSignalPayment && (
                          <div className={`rounded-xl p-3 text-xs border ${
                            b.signalPaid && b.remainingPaid
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                              : b.signalPaid
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
                              : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700'
                          }`}>
                            <span className="font-bold block mb-1">Plano de Pagamento: Sinal 50% + Restante</span>
                            <div className="flex justify-between">
                              <span>Sinal (50%):</span>
                              <span className={b.signalPaid ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'}>
                                {b.signalPaid ? `✅ Pago — ${formatBRL(b.signalAmount || 0)}` : `Pendente — ${formatBRL(b.signalAmount || 0)}`}
                              </span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span>Restante (50%):</span>
                              <span className={b.remainingPaid ? 'text-emerald-600 dark:text-emerald-400 font-bold' : b.signalPaid ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500'}>
                                {b.remainingPaid ? `✅ Pago — ${formatBRL(b.remainingAmount || 0)}` : `Pendente — ${formatBRL(b.remainingAmount || 0)}`}
                              </span>
                            </div>
                          </div>
                         )}

                        {b.notes && (
                          <p className="text-xs text-slate-500 italic bg-slate-50/50 dark:bg-slate-800/30 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                            "{b.notes}"
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                        {quote && !isPaid && (
                          <button
                            onClick={() => handleOpenPixModal(b)}
                            className="flex-1 py-2 px-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition"
                          >
                            <QrCode className="w-4 h-4" /> Pagar via PIX
                          </button>
                        )}

                        {isPaid && (
                          <>
                            <button
                              onClick={() => exportReceiptPDF(b, studioInfo)}
                              className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                            >
                              <FileText className="w-4 h-4 text-emerald-400" /> Baixar Comprovante PDF
                            </button>
                            <button
                              onClick={() => setActiveTab('reviews')}
                              className="py-2 px-3 bg-amber-500/15 hover:bg-amber-500 hover:text-black text-amber-400 border border-amber-500/40 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                              title="Avaliar este serviço com estrelas e comentário"
                            >
                              <span>⭐</span>
                              <span>Avaliar Serviço</span>
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => {
                            setActiveBookingIdForChat(b.id);
                            setActiveTab('chat');
                          }}
                          className="py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                        >
                          <MessageSquare className="w-4 h-4 text-indigo-400" /> Abrir Chat
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 3: CHAT EM TEMPO REAL COM O ESTÚDIO ================= */}
        {activeTab === 'chat' && (
          <div className="fixed top-16 right-4 sm:right-5 z-40 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden w-[420px] max-w-[calc(100vw-2rem)] h-[calc(100dvh-6rem)]">
            
            {/* Compact Session Selector */}
            <div className="shrink-0 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  Minhas Conversas com o Estúdio
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className="px-2 py-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-700 transition cursor-pointer flex items-center gap-1"
                  title="Fechar chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => chatSessionListRef.current?.scrollBy({ left: -190, behavior: 'smooth' })}
                  className="shrink-0 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#00FF41] hover:border-[#00FF41]/50 flex items-center justify-center transition cursor-pointer"
                  title="Conversas anteriores"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div
                  ref={chatSessionListRef}
                  className="flex gap-2 overflow-x-auto pb-1 no-scrollbar flex-1"
                >
                  {clientBookings.map((b) => {
                    const isActive = b.id === selectedChatBooking?.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setActiveBookingIdForChat(b.id)}
                        className={`shrink-0 px-3 py-2 rounded-xl border cursor-pointer transition text-left ${
                          isActive
                            ? 'bg-slate-900 text-white border-emerald-500 shadow-md'
                            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <p className="font-bold text-[11px] whitespace-nowrap">{b.serviceName}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 whitespace-nowrap">
                          {formatDateBR(b.preferredDate)}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => chatSessionListRef.current?.scrollBy({ left: 190, behavior: 'smooth' })}
                  className="shrink-0 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#00FF41] hover:border-[#00FF41]/50 flex items-center justify-center transition cursor-pointer"
                  title="Próximas conversas"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Chat Window */}
            <div className="flex-1 flex flex-col justify-between min-h-0 bg-slate-900 text-white">
              
              {/* Chat Header */}
              {selectedChatBooking ? (
                <>
                  <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        <Radio className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{studioInfo?.name || 'FPStudio'}</h4>
                        <p className="text-[11px] text-slate-400">
                          Sessão: {selectedChatBooking.serviceName} ({selectedChatBooking.id})
                        </p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[#00FF41] border border-[#00FF41]/40 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                        title="Anexar Comprovante de Pagamento"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>{t('chat_title_attach_receipt')}</span>
                      </button>

                      <button
                        onClick={() => handleOpenPixModal(selectedChatBooking)}
                        className="px-3 py-1.5 bg-[#00FF41] hover:bg-[#00e038] text-black font-black rounded-xl text-xs flex items-center gap-1 shadow-[0_0_15px_rgba(0,255,65,0.3)] cursor-pointer hover:scale-105 active:scale-95 transition"
                      >
                        <QrCode className="w-3.5 h-3.5" /> {t('chat_btn_pay_pix')}
                      </button>
                    </div>
                  </div>

                  {/* Message Stream */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/90">
                    {currentChatMsgs.length === 0 ? (
                      <div className="text-center py-16 space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 text-[#00FF41] flex items-center justify-center mx-auto">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <p className="text-white text-xs font-bold">{t('hero_studio_chat_link')}</p>
                        <p className="text-zinc-400 text-[11px] max-w-sm mx-auto">
                          {t('chat_empty_desc')}
                        </p>
                        <div className="pt-2 flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setChatInputText('Olá Fernando, gostaria de confirmar os detalhes do meu agendamento!');
                            }}
                            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] rounded-lg border border-zinc-700 transition"
                          >
                            💬 {t('chat_btn_initial_message')}
                          </button>
                        </div>
                      </div>
                    ) : (
                      currentChatMsgs.map((msg) => {
                        const isClientSender = msg.senderRole === 'client';

                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${isClientSender ? 'items-end' : 'items-start'}`}
                          >
                            <span className="text-[10px] text-slate-400 mb-1 px-1">
                              {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>

                            <div
                              className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-md space-y-2.5 ${
                                isClientSender
                                  ? 'bg-emerald-600 text-white rounded-br-none'
                                  : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                              }`}
                            >
                              <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>

                              {/* Quote Payload Card inside chat */}
                              {msg.quotePayload && (
                                <div className="bg-slate-950/90 border border-emerald-500/60 rounded-xl p-3.5 space-y-3 text-white shadow-lg">
                                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                                    <div className="flex items-center gap-1.5">
                                      <QrCode className="w-4 h-4 text-emerald-400" />
                                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                                        Orçamento Oficial PIX
                                      </span>
                                    </div>
                                    <span className="text-base font-black text-emerald-400">
                                      {formatBRL(msg.quotePayload.totalAmount)}
                                    </span>
                                  </div>

                                  {msg.quotePayload.notes && (
                                    <p className="text-[11px] text-slate-300 bg-zinc-900/80 p-2 rounded-lg border border-zinc-800">
                                      {msg.quotePayload.notes}
                                    </p>
                                  )}

                                  <div className="flex items-center gap-2 pt-1">
                                    <button
                                      type="button"
                                      onClick={() => handleOpenPixModal(selectedChatBooking)}
                                      className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition"
                                    >
                                      <QrCode className="w-3.5 h-3.5" /> Abrir QR Code & PIX
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        const code = msg.quotePayload?.pixPayload || (msg.quotePayload as any)?.pixCode || '36790486534';
                                        navigator.clipboard.writeText(code);
                                        setCopiedChatPixKey(msg.id);
                                        setTimeout(() => setCopiedChatPixKey(null), 2500);
                                      }}
                                      className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl border border-zinc-700 flex items-center gap-1 transition"
                                      title="Copiar Chave / Código PIX Copia e Cola"
                                    >
                                      {copiedChatPixKey === msg.id ? (
                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                      )}
                                      <span>{copiedChatPixKey === msg.id ? 'Copiado!' : 'Copiar PIX'}</span>
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Attachment Preview (Comprovante / Trilha de Referência) */}
                              {msg.attachment && (
                                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-700 space-y-2">
                                  <div className="flex items-center justify-between gap-1">
                                    {msg.attachment.fileType === 'audio' ? (
                                      <span className="text-[10px] font-bold text-fuchsia-400 uppercase flex items-center gap-1">
                                        <Mic2 className="w-3.5 h-3.5 text-fuchsia-400" /> Trilha de Referência
                                      </span>
                                    ) : (
                                      <span className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Comprovante Anexado
                                      </span>
                                    )}
                                    <span className="text-[9px] text-slate-400 truncate max-w-[140px]">
                                      {msg.attachment.name}
                                    </span>
                                  </div>

                                  {msg.attachment.fileType === 'audio' ? (
                                    <div className="space-y-2">
                                      <audio
                                        controls
                                        preload="metadata"
                                        src={msg.attachment.dataUrl}
                                        className="w-full h-9 rounded-lg"
                                      >
                                        Seu navegador não suporta reprodução de áudio.
                                      </audio>
                                      {isClientSender && onDeleteChatMessage && (
                                        <button
                                          type="button"
                                          onClick={() => onDeleteChatMessage(msg.id)}
                                          className="w-full py-1.5 bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 border border-rose-500/40 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                                        >
                                          <Trash2 className="w-3 h-3" /> Apagar Trilha Enviada
                                        </button>
                                      )}
                                    </div>
                                  ) : msg.attachment.dataUrl ? (
                                    <div
                                      onClick={() =>
                                        setLightboxAttachment({
                                          name: msg.attachment?.name || 'Comprovante PIX',
                                          dataUrl: msg.attachment?.dataUrl || '',
                                          fileType: msg.attachment?.fileType,
                                        })
                                      }
                                      className="relative group cursor-pointer overflow-hidden rounded-lg border border-slate-700 bg-black"
                                    >
                                      <img
                                        src={msg.attachment.dataUrl}
                                        alt="Comprovante"
                                        className="w-full max-h-44 object-contain rounded-lg transition group-hover:scale-105"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition">
                                        🔍 Clique para ampliar
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="p-3 bg-zinc-900 rounded-lg flex items-center gap-2 text-slate-300 text-xs">
                                      <FileText className="w-5 h-5 text-emerald-400" />
                                      <span className="truncate">{msg.attachment.name}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Pending Attachment Preview Banner */}
                  {pendingAttachment && (
                    <div className="mx-3 my-2 p-2.5 bg-zinc-950/90 rounded-xl border border-[#00FF41]/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {pendingAttachment.fileType === 'image' ? (
                          <img
                            src={pendingAttachment.dataUrl}
                            alt="Preview Comprovante"
                            className="w-12 h-12 object-cover rounded-lg border border-zinc-700"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[#00FF41]">
                            {pendingAttachment.fileType === 'audio' ? (
                              <Music2 className="w-6 h-6" />
                            ) : (
                              <FileText className="w-6 h-6" />
                            )}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-white truncate max-w-[220px]">
                            {pendingAttachment.name}
                          </p>
                          <span className="text-[10px] text-[#00FF41] font-bold">
                            {pendingAttachment.fileType === 'audio'
                              ? '🎵 Trilha de Referência (Guia Musical)'
                              : 'Anexo: Comprovante de Pagamento PIX'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPendingAttachment(null)}
                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition cursor-pointer"
                        title="Remover Anexo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChatFileSelect}
                    accept="image/*,application/pdf"
                    className="hidden"
                  />

                  {/* Hidden Audio Input */}
                  <input
                    type="file"
                    ref={audioInputRef}
                    onChange={handleTrackFileSelect}
                    accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac"
                    className="hidden"
                  />

                  {/* Chat Input Bar */}
                  <form onSubmit={handleSendTextChatMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-2.5 rounded-xl border transition flex items-center justify-center cursor-pointer ${
                        pendingAttachment
                          ? 'bg-[#00FF41] text-black border-[#00FF41]'
                          : 'bg-zinc-900 text-zinc-300 hover:text-white border-zinc-800 hover:border-[#00FF41]/60'
                      }`}
                      title={t('chat_title_attach_pix_receipt')}
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>

                    {/* Music Guide / Track Upload Button */}
                    <button
                      type="button"
                      onClick={() => audioInputRef.current?.click()}
                      className={`p-2.5 rounded-xl border transition flex items-center justify-center cursor-pointer ${
                        pendingAttachment?.fileType === 'audio'
                          ? 'bg-purple-500 text-white border-purple-400'
                          : 'bg-zinc-900 text-fuchsia-400 hover:text-fuchsia-300 border-zinc-800 hover:border-fuchsia-500/60'
                      }`}
                      title={t('chat_title_upload_reference')}
                    >
                      <Mic2 className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      placeholder={
                        pendingAttachment?.fileType === 'audio'
                          ? t('chat_placeholder_music_guide')
                          : t('chat_placeholder_message')
                      }
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                    />

                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#00FF41] hover:bg-[#00e038] text-black font-black rounded-xl text-xs flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(0,255,65,0.3)] cursor-pointer"
                    >
                      <Send className="w-4 h-4" /> {t('btn_send')}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
                  {t('chat_no_session_selected')}
                </div>
              )}

            </div>

          </div>
        )}

        {/* ================= TAB 4: MEU CADASTRO DE INFORMAÇÕES & CPF ================= */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6 py-4">
            {/* Header Banner */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00FF41]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] text-[11px] font-black uppercase tracking-wider">
                    <UserCheck className="w-3.5 h-3.5" /> {t('profile_section_client_id')}
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    {t('profile_page_heading')}
                  </h2>
                  <p className="text-xs text-zinc-400 max-w-xl">
                    {t('profile_page_desc')}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('new_booking');
                      if (typeof window !== 'undefined') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t('btn_back_home')}</span>
                  </button>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{t('profile_registration_status_label')}</span>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {profileCpf ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> {t('profile_cpf_ok_badge')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-[11px] font-bold">
                          <AlertCircle className="w-3 h-3" /> {t('profile_cpf_pending_badge')}
                        </span>
                      )}

                      {profilePixKey ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 rounded-full text-[11px] font-bold">
                          <QrCode className="w-3 h-3" /> {t('profile_pix_ok_badge')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-full text-[11px] font-bold">
                          <QrCode className="w-3 h-3" /> {t('profile_pix_undefined_badge')}
                        </span>
                      )}

                      {profilePassword ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full text-[11px] font-bold">
                          <Lock className="w-3 h-3" /> PIN 4D Ativo
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Toast with Automatic Exit to Start */}
            {profileSavedSuccess && (
              <div className="p-4 bg-emerald-950/90 border-2 border-[#00FF41] rounded-2xl text-[#00FF41] flex items-center justify-between shadow-[0_0_30px_rgba(0,255,65,0.3)] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#00FF41]/20 border border-[#00FF41]/50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#00FF41] animate-bounce" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white flex items-center gap-2">
                      <span>Dados Cadastrais Salvos com Sucesso!</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00FF41] text-black text-[10px] font-black uppercase">SALVO</span>
                    </h4>
                    <p className="text-xs text-zinc-300 font-medium mt-0.5">
                      Suas informações foram atualizadas. Retornando para a tela inicial em instantes...
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-[#00FF41]">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saindo da tela...</span>
                </div>
              </div>
            )}

            {/* Form Container */}
            <form onSubmit={handleSaveProfile} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-2xl">
              
              {/* Section 1: Dados do Artista / Responsável */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <User className="w-5 h-5 text-[#00FF41]" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    1. Identificação do Artista / Músico
                  </h3>
                </div>

                {/* Avatar / Photo Upload from Computer */}
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative group">
                    <img
                      src={
                        profileAvatarUrl ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
                      }
                      alt={profileName || 'Foto do Artista'}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-zinc-700 group-hover:border-[#00FF41] shadow-xl transition"
                    />
                    {isAvatarProcessing && (
                      <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center">
                        <RefreshCw className="w-6 h-6 text-[#00FF41] animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div>
                      <h4 className="text-sm font-black text-white flex items-center justify-center sm:justify-start gap-1.5">
                        <Camera className="w-4 h-4 text-[#00FF41]" />
                        <span>Foto de Perfil / Logo do Artista</span>
                      </h4>
                      <p className="text-xs text-zinc-400">
                        Adicione sua foto para aparecer nos depoimentos, sessões de gravação e chat com Fernando Padre.
                      </p>
                    </div>

                    <input
                      ref={avatarFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) processAvatarFile(file);
                      }}
                      className="hidden"
                    />

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => avatarFileInputRef.current?.click()}
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-[#00FF41] hover:text-black text-[#00FF41] border border-[#00FF41]/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Laptop className="w-3.5 h-3.5" />
                        <span>Carregar do Computador</span>
                      </button>

                      {profileAvatarUrl && (
                        <button
                          type="button"
                          onClick={() => setProfileAvatarUrl('')}
                          className="px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remover Foto</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Nome Completo / Razão Social *
                    </label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="Ex: Carlos Eduardo Silva"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Nome da Banda / Projeto Artístico
                    </label>
                    <input
                      type="text"
                      value={profileBand}
                      onChange={(e) => setProfileBand(e.target.value)}
                      placeholder="Ex: Banda Os Alquimistas"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1 flex items-center justify-between">
                      <span>CPF (Cadastro de Pessoa Física) *</span>
                      <span className="text-[10px] text-[#00FF41] font-normal">Para recibos e contratos</span>
                    </label>
                    <input
                      type="text"
                      value={profileCpf}
                      onChange={(e) => setProfileCpf(e.target.value)}
                      placeholder="000.000.000-00"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      RG / Documento de Identidade
                    </label>
                    <input
                      type="text"
                      value={profileRg}
                      onChange={(e) => setProfileRg(e.target.value)}
                      placeholder="Ex: 12.345.678-9 SSP/BA"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Contatos & Redes */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <Phone className="w-5 h-5 text-[#00FF41]" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    2. Canais de Contato & Redes Sociais
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      placeholder="artista@email.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      WhatsApp / Telefone *
                    </label>
                    <input
                      type="text"
                      required
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      placeholder="(71) 99999-8888"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Instagram / Rede Social
                    </label>
                    <input
                      type="text"
                      value={profileInstagram}
                      onChange={(e) => setProfileInstagram(e.target.value)}
                      placeholder="@banda_oficial"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Endereço do Cliente */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <MapPin className="w-5 h-5 text-[#00FF41]" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    3. Endereço de Faturamento / Residência
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      CEP
                    </label>
                    <input
                      type="text"
                      value={profileCep}
                      onChange={(e) => setProfileCep(e.target.value)}
                      placeholder="41110-050"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>

                  <div className="md:col-span-6">
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Endereço Completo (Rua, Número, Bairro)
                    </label>
                    <input
                      type="text"
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      placeholder="Ex: Travessa Dois Leões, nº 19, Pernambués"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Cidade / Estado
                    </label>
                    <input
                      type="text"
                      value={profileCity}
                      onChange={(e) => setProfileCity(e.target.value)}
                      placeholder="Salvador - BA"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Chave PIX para Envio / Recebimento de Pagamento */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <QrCode className="w-5 h-5 text-[#00FF41]" />
                  <div className="flex items-center justify-between flex-1">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      4. Chave PIX do Cliente (Envio de Pagamentos & Repasses)
                    </h3>
                    <span className="text-[10px] text-[#00FF41] font-bold">Uso para cachês e devoluções</span>
                  </div>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-2">
                      Tipo da Chave PIX
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'cpf', label: 'CPF' },
                        { id: 'email', label: 'E-mail' },
                        { id: 'telefone', label: 'Celular/WhatsApp' },
                        { id: 'aleatoria', label: 'Chave Aleatória (EVP)' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setProfilePixKeyType(t.id)}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition border text-center ${
                            profilePixKeyType === t.id
                              ? 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]'
                              : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Chave PIX
                    </label>
                    <input
                      type="text"
                      value={profilePixKey}
                      onChange={(e) => setProfilePixKey(e.target.value)}
                      placeholder={
                        profilePixKeyType === 'cpf'
                          ? '000.000.000-00'
                          : profilePixKeyType === 'email'
                          ? 'artista@email.com'
                          : profilePixKeyType === 'telefone'
                          ? '(71) 99999-8888'
                          : 'Ex: 123e4567-e89b-12d3-a456-426614174000'
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#00FF41]"
                    />
                    <p className="text-[11px] text-zinc-500 mt-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00FF41]" />
                      Esta chave será utilizada pelo estúdio para repasses de cachês, pagamentos de serviços e eventuais estornos/devoluções.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5: Segurança & PIN de Acesso */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <Lock className="w-5 h-5 text-[#00FF41]" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    5. Segurança da Conta & PIN de Acesso (4 Dígitos)
                  </h3>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1 flex items-center justify-between">
                      <span>PIN Numérico de Acesso</span>
                      <span className="text-[10px] text-[#00FF41] font-mono font-bold">4 DÍGITOS</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showProfilePassword ? 'text' : 'password'}
                        value={profilePassword}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setProfilePassword(val);
                        }}
                        maxLength={4}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Ex: 1234"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-4 pr-11 py-2.5 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-[#00FF41]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowProfilePassword(!showProfilePassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                        title={showProfilePassword ? 'Ocultar PIN' : 'Ver PIN'}
                      >
                        {showProfilePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      O PIN de 4 números será solicitado sempre que você acessar a sua área de cliente no estúdio.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 6: Observações / Requisitos Técnicos */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-zinc-300">
                  6. Observações Técnicas / Preferências de Produção
                </label>
                <textarea
                  rows={3}
                  value={profileNotes}
                  onChange={(e) => setProfileNotes(e.target.value)}
                  placeholder="Ex: Preferência por afinação de vocal suave, uso de microfone Kadosh 412, gravação de violão em nylon..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00FF41]"
                />
              </div>

              {/* Submit / Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('new_booking');
                    if (typeof window !== 'undefined') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-bold text-xs border border-zinc-700 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar ao Início</span>
                </button>

                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="w-full sm:w-auto px-6 py-3 bg-[#00FF41] hover:bg-[#00e038] disabled:opacity-80 text-black font-black text-xs rounded-xl shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:scale-105 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSavingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SALVANDO E RETORNANDO...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>SALVAR DADOS CADASTRAIS (CPF & PIX)</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Tab: Services / Material & Equipamentos do Estúdio */}
        {(activeTab === 'equipment' || activeTab === 'services' || activeTab === 'services_equipment') && (
          <EquipmentView
            currentRole="client"
            defaultSection={activeTab === 'services' ? 'services' : activeTab === 'equipment' ? 'equipment' : 'all'}
            equipmentItems={equipmentItems}
            services={services}
            onUpdateEquipment={onUpdateEquipment}
            onCreateEquipment={onCreateEquipment}
            onDeleteEquipment={onDeleteEquipment}
            onNavigateToBooking={(serviceId) => {
              if (serviceId) {
                const srv = services.find((s) => s.id === serviceId);
                if (srv) {
                  setSelectedService(srv);
                }
              }
              setActiveTab('new_booking');
              setTimeout(() => {
                document.getElementById('servicos-desejados')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
            }}
          />
        )}

      </div>

      {/* Booking & PIX Request Success Confirmation Modal */}
      {bookingSuccessModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-[#00FF41]/40 rounded-2xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(0,255,65,0.2)] text-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-zinc-900 to-black p-5 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00FF41]/20 border border-[#00FF41]/40 flex items-center justify-center text-[#00FF41]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-[#00FF41] font-black uppercase tracking-wider block">
                    Solicitação Concluída
                  </span>
                  <h3 className="text-base font-black text-white">
                    Agendamento & Orçamento PIX
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setBookingSuccessModalData(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {/* Summary Card */}
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Código da Reserva:</span>
                  <span className="font-mono font-bold text-[#00FF41]">{bookingSuccessModalData.booking.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Data e Horário:</span>
                  <span className="font-bold text-white">
                    {formatDateBR(bookingSuccessModalData.booking.preferredDate)} às {bookingSuccessModalData.booking.startTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Serviço / Estúdio:</span>
                  <span className="font-bold text-white">
                    {bookingSuccessModalData.booking.serviceName || 'FPStudio Salvador'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <span className="text-zinc-400">Valor Total do Projeto:</span>
                  <span className="font-black text-white text-sm">
                    {formatBRL(bookingSuccessModalData.booking.totalAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-[#00FF41]/10 border border-[#00FF41]/30 p-2.5 rounded-lg">
                  <div>
                    <span className="text-[10px] text-[#00FF41] font-black uppercase block">
                      {bookingSuccessModalData.quote?.isSignalPayment ? 'Valor do Sinal PIX (50%)' : 'Valor Total PIX'}
                    </span>
                    <span className="text-[11px] text-zinc-300">
                      {bookingSuccessModalData.quote?.isSignalPayment
                        ? 'Pague 50% agora para garantir a vaga'
                        : 'Pagamento integral'}
                    </span>
                  </div>
                  <span className="text-base font-black text-[#00FF41]">
                    {formatBRL(
                      bookingSuccessModalData.quote?.signalAmount ||
                      bookingSuccessModalData.quote?.totalAmount ||
                      Math.round(bookingSuccessModalData.booking.totalAmount / 2)
                    )}
                  </span>
                </div>
              </div>

              {/* PIX Payment Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center space-y-3">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#00FF41]">
                  <QrCode className="w-4 h-4" />
                  <span>Chave PIX Oficial FPStudio</span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 inline-block mx-auto">
                  <div className="w-40 h-40 bg-white p-2 rounded-lg flex items-center justify-center mx-auto shadow-inner">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        bookingSuccessModalData.quote?.pixPayload ||
                        `00020126330014BR.GOV.BCB.PIX011136790486534520400005303986540${Math.round(
                          (bookingSuccessModalData.quote?.signalAmount || bookingSuccessModalData.booking.totalAmount / 2) * 100
                        )}5802BR5914Fernando Padre6008Salvador62070503***6304`
                      )}`}
                      alt="QR Code PIX"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-zinc-400">Beneficiário: <strong className="text-white">Fernando Padre (FPStudio)</strong></p>
                  <p className="text-zinc-400">Banco: <strong className="text-white">Nu Pagamentos (Nubank)</strong></p>
                  <p className="text-zinc-400">Chave CPF: <strong className="text-[#00FF41] font-mono">36790486534</strong></p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('36790486534');
                      setCopiedStudioPix(true);
                      setTimeout(() => setCopiedStudioPix(false), 2500);
                    }}
                    className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-zinc-700"
                  >
                    {copiedStudioPix ? <Check className="w-3.5 h-3.5 text-[#00FF41]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedStudioPix ? 'Chave CPF Copiada!' : 'Copiar Chave CPF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const payload = bookingSuccessModalData.quote?.pixPayload || '00020126330014BR.GOV.BCB.PIX0111367904865345204000053039865802BR5914Fernando Padre6008Salvador6304';
                      navigator.clipboard.writeText(payload);
                      setCopiedModalPayload(true);
                      setTimeout(() => setCopiedModalPayload(false), 2500);
                    }}
                    className="w-full py-2.5 bg-[#00FF41] hover:bg-[#00e038] text-black rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                  >
                    {copiedModalPayload ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedModalPayload ? 'Copia e Cola Copiado!' : 'Copiar PIX Copia e Cola'}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveBookingIdForChat(bookingSuccessModalData.booking.id);
                    setBookingSuccessModalData(null);
                    setActiveTab('chat');
                  }}
                  className="py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-zinc-700"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#00FF41]" />
                  <span>Abrir Chat com Estúdio</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBookingSuccessModalData(null);
                    setActiveTab('bookings');
                  }}
                  className="py-3 bg-zinc-800 hover:bg-zinc-700 text-[#00FF41] rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-zinc-700"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Ver Meus Agendamentos</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PIX Payment Modal */}
      {activePixModalQuote && activePixModalBooking && (
        <PIXModal
          quote={activePixModalQuote}
          booking={activePixModalBooking}
          onClose={() => {
            setActivePixModalQuote(null);
            setActivePixModalBooking(null);
          }}
          onSendReceipt={handleSendReceiptFromModal}
        />
      )}

      {/* Credit Card Payment Modal */}
      {showCreditCardModal && selectedService && (
        <CreditCardModal
          booking={{
            id: `cc-${Date.now()}`,
            clientId: activeClient?.id || '',
            clientName: activeClient?.name || bookingClientName,
            clientEmail: activeClient?.email || bookingClientEmail || '',
            clientPhone: activeClient?.phone || bookingClientPhone || '',
            bandOrArtistName: activeClient?.bandOrArtistName || bookingBandName || '',
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            roomId: selectedRoom?.id || 'fpstudio',
            roomName: selectedRoom?.name || 'FPStudio',
            preferredDate: selectedDate,
            startTime: selectedTime,
            totalAmount: (() => {
              const optSum = selectedOptions.reduce((acc, optId) => acc + (materialById(optId)?.price || 0), 0);
              return ((selectedService?.basePrice || 0) + optSum) * tracksCount;
            })(),
            discountAmount: 0,
            finalAmount: (() => {
              const optSum = selectedOptions.reduce((acc, optId) => acc + (materialById(optId)?.price || 0), 0);
              return ((selectedService?.basePrice || 0) + optSum) * tracksCount;
            })(),
            paymentPlan,
            paymentMethod: 'CREDIT_CARD',
            status: 'pendente_orcamento',
            notes: bookingNotes,
            selectedInstruments: selectedOptions,
            durationHours: selectedService?.durationHours || 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }}
          onClose={() => setShowCreditCardModal(false)}
          onConfirmPayment={(brand, lastFour, inst, holder) => {
            setShowCreditCardModal(false);
          }}
        />
      )}

      {/* Sticky Floating Chat Button matching user screenshot */}
      {activeTab !== 'chat' && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setActiveTab('chat')}
            className="px-5 py-3 rounded-full bg-[#00FF41] hover:bg-[#00e038] text-black font-black text-xs shadow-[0_0_25px_rgba(0,255,65,0.5)] hover:scale-105 transition flex items-center gap-2 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span>🟢 CHAT COM O ESTÚDIO</span>
          </button>
        </div>
      )}

      {/* Lightbox Modal for Receipts & Attachments */}
      {lightboxAttachment && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxAttachment(null)}
        >
          <div
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 max-w-3xl w-full max-h-[90vh] flex flex-col space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00FF41]" />
                <span className="font-black text-sm text-white truncate max-w-[280px] sm:max-w-md">
                  {lightboxAttachment.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxAttachment.dataUrl}
                  download={lightboxAttachment.name}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[#00FF41] border border-[#00FF41]/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Baixar
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxAttachment(null)}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center bg-black/60 rounded-2xl p-2 min-h-[300px]">
              {lightboxAttachment.fileType === 'pdf' || (!lightboxAttachment.dataUrl.startsWith('data:image') && lightboxAttachment.name.endsWith('.pdf')) ? (
                <iframe
                  src={lightboxAttachment.dataUrl}
                  title="PDF Preview"
                  className="w-full h-[60vh] rounded-xl border border-zinc-800"
                />
              ) : (
                <img
                  src={lightboxAttachment.dataUrl}
                  alt={lightboxAttachment.name}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Map Modal */}
      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />

    </div>
  );
};
