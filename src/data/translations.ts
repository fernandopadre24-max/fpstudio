export type Language = 'pt' | 'en';

export interface Translations {
  // Navigation
  nav_schedule: string;
  nav_my_orders: string;
  nav_services: string;
  nav_gear: string;
  nav_services_gear: string;
  nav_reviews: string;
  nav_chat: string;
  nav_profile: string;
  nav_admin_agenda: string;
  nav_admin_clients: string;
  nav_admin_finances: string;
  nav_admin_assistant: string;
  nav_signin: string;
  nav_signout: string;
  nav_admin: string;
  nav_customize: string;
  nav_notifications: string;
  nav_mark_read: string;
  nav_no_notifications: string;

  // Customization Modal
  custom_title: string;
  custom_subtitle: string;
  custom_tab_language: string;
  custom_tab_accent: string;
  custom_tab_background: string;
  custom_tab_font: string;
  custom_tab_fontsize: string;
  custom_language_title: string;
  custom_language_desc: string;
  custom_accent_title: string;
  custom_accent_desc: string;
  custom_bg_title: string;
  custom_bg_desc: string;
  custom_font_title: string;
  custom_font_desc: string;
  custom_size_title: string;
  custom_size_desc: string;
  custom_preview_title: string;
  custom_preview_sample_heading: string;
  custom_preview_sample_text: string;
  custom_preview_sample_badge: string;
  custom_btn_reset: string;
  custom_btn_apply: string;
  theme_mode_dark: string;
  theme_mode_light: string;
  custom_mode_title: string;
  custom_mode_desc: string;

  // Common UI
  btn_book_now: string;
  btn_request_quote: string;
  btn_cancel: string;
  btn_save: string;
  btn_edit: string;
  btn_delete: string;
  btn_close: string;
  btn_copy: string;
  btn_copied: string;
  btn_details: string;
  btn_view_on_map: string;
  
  // Statuses
  status_pending: string;
  status_confirmed: string;
  status_paid: string;
  status_completed: string;
  status_canceled: string;
  status_included: string;
  
  // Sections
  sec_quick_booking: string;
  sec_materials_title: string;
  sec_materials_subtitle: string;
  sec_services_title: string;
  sec_services_subtitle: string;
  sec_reviews_title: string;
  sec_reviews_subtitle: string;
  sec_location_title: string;

  // Producer & Studio
  producer_tagline: string;
  studio_location_desc: string;

  // Common UI extended
  btn_send: string;
  btn_send_receipt: string;
  btn_pay_pix: string;
  btn_new_booking: string;
  btn_reserve_first: string;
  btn_open_chat: string;
  btn_review: string;
  btn_download_receipt: string;
  btn_request_booking: string;
  btn_register_to_book: string;
  btn_clear_selection: string;
  btn_add_included: string;
  btn_combo_band: string;
  btn_combo_forro: string;
  btn_copy_key: string;
  btn_save_profile: string;
  btn_register_artist: string;
  btn_already_registered: string;
  btn_upload_computer: string;
  btn_remove_photo: string;
  btn_back_home: string;
  btn_agendar: string;
  btn_detalhes: string;
  btn_solicitar_agendamento: string;
  btn_fechar: string;
  btn_alterar_valor_imagem: string;
  btn_salvar_alteracoes: string;
  btn_confirmar_exclusao: string;
  btn_limpar_filtros: string;
  btn_ver_tudo: string;
  btn_novo_servico: string;
  btn_novo_servico_pacote: string;

  // Statuses extended
  status_paid_confirmed: string;
  status_waiting_pix: string;
  status_receipt_review: string;
  status_studio_review: string;
  status_in_analysis: string;
  status_completed_checkout: string;
  status_budget_sent: string;
  status_receipt_attached: string;

  // Sections extended
  sec_instruments: string;
  sec_payment: string;
  sec_notes: string;
  sec_client_id: string;
  sec_artist_id: string;
  sec_address: string;
  sec_pix_key: string;
  sec_security_pin: string;
  sec_technical_notes: string;
  sec_registration_docs: string;
  sec_service_history: string;
  sec_financial_entries: string;
  sec_equipment: string;

  // Hero
  hero_location_badge: string;
  hero_genre_tag: string;
  hero_location: string;
  hero_main_heading: string;
  hero_subtitle: string;
  hero_btn_instrument_budget: string;
  hero_btn_view_schedule: string;
  hero_btn_view_map: string;
  hero_producer_name: string;
  hero_producer_role: string;
  hero_feature_vocal_tuning: string;
  hero_feature_tuning_tools: string;
  hero_feature_mix_master: string;
  hero_feature_streaming_ready: string;
  hero_room_section_label: string;
  hero_studio_name_heading: string;
  hero_available_badge: string;
  hero_feature_protools: string;
  hero_feature_protools_desc: string;
  hero_included_badge: string;
  hero_feature_microphone: string;
  hero_feature_microphone_desc: string;
  hero_included_badge_2: string;
  hero_feature_audio_interface: string;
  hero_feature_audio_interface_desc: string;
  hero_included_badge_3: string;
  hero_doubts_text: string;
  hero_studio_chat_link: string;
  hero_infra_badge: string;
  hero_infra_heading: string;
  hero_infra_desc: string;

  // Tabs
  tabs_schedule: string;
  tabs_my_bookings: string;
  tabs_services: string;
  tabs_services_sub: string;
  tabs_reviews: string;
  tabs_chat: string;
  tabs_profile_title: string;
  tabs_cpf_ok: string;

  // Booking
  booking_section_services_heading: string;
  booking_services_subtitle: string;
  booking_service_category_fallback: string;
  booking_duration_suffix: string;
  booking_studio_name: string;
  booking_equipment_heading: string;
  booking_recording_editing_badge: string;
  booking_selected_service_label: string;
  booking_select_service_default: string;
  booking_session_info: string;
  booking_base_price_label: string;
  booking_client_id_section: string;
  booking_connected_profile_badge: string;
  booking_registration_required_badge: string;
  booking_connected_artist_text: string;
  booking_my_registration_btn: string;
  booking_login_required_heading: string;
  booking_registration_instructions: string;
  booking_label_responsible_name: string;
  booking_placeholder_full_name: string;
  booking_label_whatsapp_phone: string;
  booking_placeholder_phone: string;
  booking_label_artist_name: string;
  booking_placeholder_band_name: string;
  booking_label_email: string;
  booking_placeholder_email: string;
  booking_label_session_date: string;
  booking_label_available_times: string;
  booking_time_slot_booked: string;
  booking_label_track_count: string;
  booking_track_count_hint: string;
  booking_label_reference_tracks: string;
  booking_reference_tracks_sent: string;
  booking_limit_reached: string;
  booking_reference_tracks_hint: string;
  booking_reference_track_singular: string;
  booking_reference_track_plural: string;
  booking_label_instruments_processing: string;
  booking_instruments_subtitle: string;
  booking_category_all: string;
  booking_category_included: string;
  booking_category_guitars_basses: string;
  booking_category_violoes_sanfona: string;
  booking_category_battery_percussion: string;
  booking_category_keyboards_strings: string;
  booking_category_vocals: string;
  booking_category_protools_editing: string;
  booking_included_label: string;
  booking_label_payment_plan: string;
  booking_payment_plan_signal: string;
  booking_recommended_badge: string;
  booking_payment_plan_signal_desc: string;
  booking_payment_plan_signal_hint: string;
  booking_payment_plan_full: string;
  booking_full_payment_badge: string;
  booking_payment_plan_full_desc: string;
  booking_payment_plan_full_hint: string;
  booking_label_unit_price: string;
  booking_label_track_quantity: string;
  booking_label_total_project: string;
  booking_pix_value_label: string;
  booking_pix_value_hint: string;
  booking_pix_key_label: string;
  booking_key_copied: string;
  booking_label_project_details: string;
  booking_placeholder_project_notes: string;
  booking_btn_submitting: string;
  booking_track_singular: string;
  booking_track_plural: string;
  booking_error_select_service: string;
  booking_error_select_date: string;
  booking_error_select_time: string;
  booking_alert_invalid_audio: string;
  booking_alert_valid_audio_only: string;
  booking_alert_track_limit_reached: string;
  booking_alert_duplicate_track: string;
  booking_receipt_sent_message: string;
  booking_track_submission_message: string;
  booking_track_submission_single: string;
  booking_draft_default_client_name: string;
  booking_draft_default_band_name: string;
  booking_draft_default_room: string;
  booking_receipt_attached_message: string;
  booking_quote_notes_official_budget: string;
  booking_quote_notes_signal: string;
  booking_quote_notes_official: string;
  booking_submitted_success: string;

  // Payment Method
  payment_method_label: string;
  payment_method_pix: string;
  payment_method_credit_card: string;
  payment_method_pix_desc: string;
  payment_method_credit_card_desc: string;
  credit_card_select_brand: string;
  credit_card_brand_visa: string;
  credit_card_brand_mastercard: string;
  credit_card_brand_elo: string;
  credit_card_brand_amex: string;
  credit_card_brand_discover: string;
  credit_card_brand_diners: string;
  credit_card_brand_jcb: string;
  credit_card_brand_hiper: string;
  credit_card_installments: string;
  credit_card_installment_singular: string;
  credit_card_installment_plural: string;
  credit_card_holder_name: string;
  credit_card_holder_placeholder: string;
  credit_card_number: string;
  credit_card_number_placeholder: string;
  credit_card_expiry: string;
  credit_card_expiry_placeholder: string;
  credit_card_cvv: string;
  credit_card_cvv_placeholder: string;
  credit_card_installment_value: string;
  credit_card_total_value: string;
  credit_card_confirm_payment: string;
  credit_card_processing: string;
  credit_card_success_title: string;
  credit_card_success_message: string;
  credit_card_error_title: string;
  credit_card_error_message: string;
  credit_card_secure_notice: string;
  credit_card_supported_brands: string;

  // Bookings
  bookings_page_heading: string;
  bookings_page_subtitle: string;
  bookings_empty_heading: string;
  bookings_empty_desc: string;
  bookings_booking_code_label: string;
  bookings_status_paid_confirmed: string;
  bookings_status_receipt_review: string;
  bookings_status_waiting_pix: string;
  bookings_status_studio_review: string;
  bookings_label_date_time: string;
  bookings_label_final_value: string;
  bookings_no_session_selected: string;
  bookings_review_title: string;

  // Chat
  chat_sidebar_heading: string;
  chat_session_info: string;
  chat_title_attach_receipt: string;
  chat_btn_send_receipt: string;
  chat_btn_pay_pix: string;
  chat_empty_heading: string;
  chat_empty_desc: string;
  chat_btn_initial_message: string;
  chat_quote_header: string;
  chat_title_copy_pix_code: string;
  chat_copied: string;
  chat_btn_copy_pix: string;
  chat_attachment_reference: string;
  chat_attachment_receipt: string;
  chat_audio_unsupported: string;
  chat_btn_delete_track: string;
  chat_lightbox_receipt_name: string;
  chat_lightbox_zoom_hint: string;
  chat_pending_attachment_reference: string;
  chat_pending_attachment_receipt: string;
  chat_title_remove_attachment: string;
  chat_title_attach_pix_receipt: string;
  chat_title_upload_reference: string;
  chat_placeholder_music_guide: string;
  chat_placeholder_message: string;
  chat_no_session_selected: string;
  chat_receipt_sent_message: string;
  chat_default_sender_name: string;

  // Profile
  profile_section_client_id: string;
  profile_page_heading: string;
  profile_page_desc: string;
  profile_registration_status_label: string;
  profile_cpf_ok_badge: string;
  profile_cpf_pending_badge: string;
  profile_pix_ok_badge: string;
  profile_pix_undefined_badge: string;
  profile_pin_active_badge: string;
  profile_success_toast_title: string;
  profile_success_toast_badge: string;
  profile_success_toast_desc: string;
  profile_success_toast_exiting: string;
  profile_section_artist_id: string;
  profile_section_avatar_heading: string;
  profile_avatar_desc: string;
  profile_label_full_name: string;
  profile_placeholder_full_name: string;
  profile_label_band_name: string;
  profile_placeholder_band_name: string;
  profile_label_cpf: string;
  profile_cpf_hint: string;
  profile_placeholder_cpf: string;
  profile_label_rg: string;
  profile_placeholder_rg: string;
  profile_label_email: string;
  profile_placeholder_email: string;
  profile_label_whatsapp_phone: string;
  profile_placeholder_phone: string;
  profile_label_instagram: string;
  profile_placeholder_instagram: string;
  profile_section_address: string;
  profile_label_cep: string;
  profile_placeholder_cep: string;
  profile_label_full_address: string;
  profile_placeholder_address: string;
  profile_label_city_state: string;
  profile_placeholder_city_state: string;
  profile_section_pix_key: string;
  profile_pix_key_hint: string;
  profile_label_pix_key_type: string;
  profile_pix_key_type_cpf: string;
  profile_pix_key_type_email: string;
  profile_pix_key_type_phone: string;
  profile_pix_key_type_random: string;
  profile_label_pix_key_value: string;
  profile_placeholder_pix_cpf: string;
  profile_placeholder_pix_email: string;
  profile_placeholder_pix_phone: string;
  profile_placeholder_pix_random: string;
  profile_pix_key_desc: string;
  profile_section_security_pin: string;
  profile_label_pin: string;
  profile_pin_digits_label: string;
  profile_placeholder_pin: string;
  profile_pin_desc: string;
  profile_section_notes: string;
  profile_placeholder_notes: string;
  profile_btn_saving: string;
  profile_btn_save_profile: string;

  // Modal
  modal_success_title_label: string;
  modal_success_heading: string;
  modal_label_booking_code: string;
  modal_label_date_time: string;
  modal_label_service_studio: string;
  modal_label_total_value: string;
  modal_pix_value_label: string;
  modal_signal_payment_desc: string;
  modal_full_payment_desc: string;
  modal_official_pix_key_label: string;
  modal_label_beneficiary: string;
  modal_label_bank: string;
  modal_label_cpf_key: string;
  modal_cpf_key_copied: string;
  modal_btn_copy_cpf_key: string;
  modal_copia_cola_copied: string;
  modal_btn_copy_pix_code: string;
  modal_label_beneficiary_name: string;
  modal_label_bank_name: string;
  modal_label_cpf_key_label: string;

  // EquipmentView
  section_servicos_e_valores: string;
  section_material_e_instrumentos: string;
  section_ver_tudo: string;
  button_novo_servico: string;
  badge_acervo_instrumentos_estudio: string;
  badge_tabela_gravacao_edicao: string;
  heading_material_instrumentos_gravacao: string;
  subheading_equipment_hero_desc: string;
  placeholder_search_equipment: string;
  button_adicionar_item: string;
  label_valor: string;
  button_detalhes_foto_item: string;
  tooltip_editar_item_valores: string;
  tooltip_excluir_item: string;
  empty_equipment_nenhum_encontrado: string;
  empty_equipment_sem_resultados: string;
  button_limpar_filtros: string;
  badge_tabela_oficial_servicos: string;
  badge_modulo_edicao_ativo: string;
  heading_servicos_oferedos_valores: string;
  subheading_servicos_lista_desc: string;
  subheading_servicos_admin_desc: string;
  button_novo_servico_pacote: string;
  placeholder_search_servico: string;
  label_horas_estudio: string;
  label_horas_sessao: string;
  tooltip_editar_valores_foto_servico: string;
  tooltip_excluir_servico: string;
  label_fpstudio_salvador: string;
  button_alterar_valor_imagem: string;
  button_detalhes: string;
  button_agendar: string;
  empty_servico_nenhum_encontrado: string;
  empty_servico_sem_resultados: string;
  button_limpar_filtros_servicos: string;
  label_incluso_na_sessao: string;
  button_reduzir_foto: string;
  button_ampliar_imagem: string;
  heading_uso_gravacao_edicao: string;
  text_descricao_preco_detalhes_1: string;
  text_descricao_preco_detalhes_2: string;
  heading_descricao_aplicacao_fpstudio: string;
  heading_specifications_tech: string;
  label_acervo_instrumentos_fpstudio: string;
  button_fechar: string;
  modal_editar_item_acervo: string;
  modal_adicionar_novo_item_acervo: string;
  label_titulo_instrumento_equipamento: string;
  placeholder_ex_guitarras_eletricas: string;
  label_tag_categoria: string;
  placeholder_ex_cordas: string;
  label_tag_modelo_verd: string;
  placeholder_ex_ibanez: string;
  label_valor_gravacao: string;
  placeholder_zero_para_incluso: string;
  text_zero_incluso_sessao: string;
  label_detalhes_edicao_gravacao: string;
  placeholder_ex_gravacao_edicao: string;
  label_foto_equipamento_instrumento: string;
  tab_do_seu_pc_celular: string;
  tab_link_web_opcional: string;
  text_foto_carregada: string;
  button_remover_foto: string;
  text_nenhuma_imagem_selecionada: string;
  button_otimizando_enviando_foto: string;
  button_substituir_foto: string;
  button_escolher_foto: string;
  text_foto_salva_servidor: string;
  label_cole_url_imagem: string;
  placeholder_descricao_equipamento: string;
  button_cancelar: string;
  button_salvar_item_acervo: string;
  label_foto_capa_servico: string;
  tab_fotos_prontas: string;
  label_cole_link_direto: string;
  placeholder_url_imagem: string;
  placeholder_explique_incluso_pacote: string;
  button_salvar_alteracoes: string;
  label_h_de_estudio: string;
  label_valor_oficial: string;
  heading_o_que_esta_incluso: string;
  label_local: string;
  label_duracao_estimada: string;
  button_solicitar_agendamento: string;
  modal_excluir_servico: string;
  text_excluir_servico_desc: string;
  button_confirmar_exclusao: string;
  modal_confirmar_remover_item_acervo: string;
  alert_imagem_nao_processada: string;
  alert_imagem_servico_nao_processada: string;
  category_todos: string;
  category_cordas: string;
  category_percussao_bateria: string;
  category_instrumentos_especiais: string;
  category_teclados_fx: string;
  category_daw_software: string;
  category_captacao_voz: string;
  category_monitoramento: string;
  category_gravacao: string;
  category_producao_autoral: string;
  category_mix_master: string;
  category_dublagem: string;
  label_duracao_estudio_horas: string;
  text_tempo_estimado_gravacao_edicao: string;
  label_categoria: string;
  select_gravacao: string;
  label_producao_autoral: string;
  label_mix_master: string;
  label_dublagem_vinheta: string;
  label_equip_title: string;
  placeholder_equip_title: string;
  label_equip_category: string;
  label_equip_model: string;
  label_equip_price: string;
  label_equip_editing: string;
  label_equip_photo: string;
  label_equip_description: string;
  label_equip_url: string;

  // ReviewsView
  hero_badge_verified_reviews: string;
  hero_title_users_artists: string;
  hero_subtitle_description: string;
  btn_leave_my_review: string;
  btn_schedule_my_recording: string;
  stats_overall_average_label: string;
  stats_rating_scale: string;
  stats_artists_recommend: string;
  stats_based_on_reviews: string;
  stats_rating_distribution: string;
  pillars_technical_highlights: string;
  pillar_capture_quality: string;
  pillar_microphone_acoustics: string;
  pillar_vocal_tuning: string;
  pillar_fernando_service: string;
  pillars_professional_standard: string;
  producer_panel_header: string;
  producer_studio_location: string;
  producer_reply_hub_title: string;
  producer_reply_hub_subtitle: string;
  toast_producer_mode_activated: string;
  toast_producer_mode_deactivated: string;
  filter_card_total_reviews: string;
  filter_card_pending: string;
  filter_card_replied: string;
  search_placeholder: string;
  filter_tab_all: string;
  filter_tab_pending: string;
  filter_tab_replied: string;
  sort_option_recent: string;
  sort_option_most_likes: string;
  sort_option_highest_rating: string;
  filter_category_label: string;
  category_all_reviews: string;
  category_production_arrangement: string;
  category_recording_capture: string;
  category_editing_tuning: string;
  category_jingles_voiceover: string;
  empty_no_reviews_found: string;
  empty_try_different_filters: string;
  btn_clear_filters: string;
  avatar_zoom_title: string;
  badge_official_recording: string;
  location_brand_label: string;
  btn_view_hd_photo: string;
  badge_session_completed: string;
  reply_author_name: string;
  reply_official_producer: string;
  zoom_subtitle_artist_client: string;
  btn_edit_your_way: string;
  btn_remove_reply: string;
  status_waiting_producer_reply: string;
  btn_reply_my_way: string;
  inline_reply_producer_badge: string;
  inline_edit_reply_label: string;
  inline_reply_label: string;
  btn_close_inline: string;
  tab_mode_custom_free: string;
  tab_mode_templates: string;
  voice_listening_status: string;
  btn_voice_dictation: string;
  label_template_instruction: string;
  label_studio_emojis: string;
  label_quick_snippets: string;
  label_custom_message: string;
  placeholder_custom_message: string;
  label_preview_official_reply: string;
  label_character_count: string;
  btn_clear_text: string;
  btn_publish_my_reply: string;
  btn_copy_review_title: string;
  btn_share: string;
  btn_edit_reply: string;
  btn_reply: string;
  toast_review_deleted: string;
  btn_delete_review_title: string;
  gallery_star_header: string;
  gallery_recordings_made: string;
  gallery_click_for_hd: string;
  btn_leave_photo_review: string;
  badge_stars: string;
  fallback_genre_label: string;
  btn_zoom_photo_gallery: string;
  lightbox_hd_photo_label: string;
  lightbox_artist_testimonial: string;
  btn_lightbox_close: string;
  lightbox_close_title: string;
  modal_your_opinion_label: string;
  modal_review_service_title: string;
  label_full_name: string;
  placeholder_full_name_example: string;
  label_band_project_name: string;
  placeholder_band_project_example: string;
  label_service_performed: string;
  label_track_project_title: string;
  placeholder_track_example: string;
  label_music_genre: string;
  placeholder_genre_example: string;
  label_session_photo: string;
  label_photo_optional_hd: string;
  tab_source_computer: string;
  tab_source_url: string;
  tab_source_presets: string;
  drag_drop_instruction: string;
  drag_drop_formats: string;
  btn_select_file: string;
  processing_image_label: string;
  url_paste_instruction: string;
  preset_select_instruction: string;
  photo_uploaded_label: string;
  preview_fullscreen_label: string;
  badge_hd_1080p: string;
  label_star_rating: string;
  label_comment_testimonial: string;
  placeholder_comment_experience: string;
  label_session_highlights: string;
  btn_publishing: string;
  btn_submit_testimonial: string;
  modal_reply_artist_title: string;
  reply_tab_mode_custom: string;
  reply_tab_suggestions: string;
  reply_voice_listening: string;
  reply_voice_dictate: string;
  reply_label_quick_reply_templates: string;
  reply_label_studio_emojis: string;
  reply_label_quick_phrases: string;
  reply_label_official_message: string;
  reply_placeholder_free_text: string;
  reply_label_preview_official: string;
  reply_label_character_count: string;
  reply_btn_clear: string;
  reply_btn_remove_reply: string;
  reply_btn_cancel: string;
  reply_btn_saving: string;
  reply_btn_publish_reply: string;
  toast_invalid_image_file: string;
  toast_failed_read_file: string;
  toast_review_submitted: string;
  toast_save_error: string;
  toast_voice_not_supported: string;
  toast_voice_listening: string;
  toast_speech_to_text_success: string;
  toast_official_reply_published: string;
  toast_inline_reply_published: string;
  toast_studio_reply_removed: string;
  toast_remove_reply_error: string;
  toast_template_inserted: string;
  toast_template_applied: string;
  rating_label_5: string;
  rating_label_4: string;
  rating_label_3: string;
  rating_label_2: string;
  rating_label_1: string;
  template_gratitude: string;
  template_vocal_praise: string;
  template_production_instruments: string;
  template_drums_energy: string;
  template_exclusive_arrangement: string;
  snippet_tmj_bro: string;
  snippet_pressure_salvador: string;
  snippet_vocal_arrangement_ten: string;
  snippet_drums_punch: string;
  snippet_pro_tools_preamps: string;
  snippet_ready_platforms: string;
  snippet_fernando_brace: string;
  tag_pro_tools: string;
  tag_excellent_acoustics: string;
  tag_fernando_ten: string;
  tag_exclusive_arrangement: string;
  tag_melodyne_tuning: string;
  tag_kadosh_412: string;
  tag_maudio_board: string;
  tag_tomato_speakers: string;
  tag_drum_editing: string;
  tag_ibanez_guitars: string;
  tag_six_string_bass: string;
  tag_steel_nylon_guitar: string;
  tag_accordion: string;
  tag_commercial_jingle: string;
  tag_punctuality_coffee: string;
  default_genre_brasilileira_pop: string;
  default_signature_label: string;
  fallback_guests_artist: string;
  fallback_music_production: string;
  fallback_recording_production: string;
  fallback_genre_brasilileira: string;

  // Validation
  validation_name_required: string;
  validation_email_required: string;

  // StudioView (ADM)
  header_executive_panel_title: string;
  header_restricted_area: string;
  header_operator_label: string;
  header_default_operator_name: string;
  header_subtitle_description: string;
  header_admin_settings_title: string;
  header_change_admin_data_button: string;
  header_switch_to_client_view_title: string;
  header_view_as_client: string;
  nav_agenda: string;
  nav_clients: string;
  nav_services_equipment: string;
  nav_reviews_label: string;
  nav_financials: string;
  nav_ai_assistant: string;
  nav_password_pin_badge: string;
  kpi_total_summary: string;
  kpi_studio_name: string;
  kpi_total_requests: string;
  kpi_confirmed_revenue: string;
  kpi_paid_sessions: string;
  kpi_total_pending: string;
  kpi_budgets_in_analysis: string;
  kpi_pix_validation_status: string;
  kpi_pending_approval: string;
  kpi_all_pix_validated: string;
  kpi_receipts_to_validate: string;
  chat_bookings_clients: string;
  chat_filter_all: string;
  chat_filter_receipt_sent: string;
  chat_filter_budget_pending: string;
  chat_filter_waiting_pix: string;
  chat_filter_payment_confirmed: string;
  chat_status_confirmed: string;
  chat_status_receipt: string;
  chat_status_pending: string;
  chat_hours_of_session: string;
  chat_send_pix_budget: string;
  chat_confirm_pix: string;
  chat_reference_track: string;
  chat_audio_not_supported: string;
  chat_download_track: string;
  chat_delete: string;
  chat_receipt_attached: string;
  chat_receipt_pix: string;
  chat_click_to_zoom: string;
  chat_approve_receipt_and_effect_pix: string;
  chat_quick_replies: string;
  chat_quick_reply_budget_available: string;
  chat_quick_reply_receipt_received: string;
  chat_quick_reply_payment_confirmed: string;
  chat_placeholder_reply: string;
  chat_send_button: string;
  chat_select_a_request: string;
  agenda_header_title: string;
  agenda_header_subtitle: string;
  agenda_total_appointments: string;
  agenda_all_requests: string;
  agenda_confirmed_active: string;
  agenda_waiting_execution: string;
  agenda_sessions_completed_checkout: string;
  agenda_checkout_done: string;
  agenda_pending_pix: string;
  agenda_in_analysis_budget: string;
  agenda_management_rollback: string;
  agenda_total_count: string;
  agenda_rollback_description: string;
  agenda_rollback_yesterday: string;
  agenda_undo_today: string;
  agenda_filter_all: string;
  agenda_filter_confirmed: string;
  agenda_filter_completed_checkout: string;
  agenda_filter_pending_pix: string;
  agenda_filter_cancelled: string;
  agenda_search_placeholder: string;
  agenda_clear_date_title: string;
  agenda_clear_date_button: string;
  agenda_no_appointments: string;
  agenda_no_matching_sessions: string;
  agenda_reset_filters: string;
  agenda_status_session_completed: string;
  agenda_status_payment_confirmed: string;
  agenda_status_receipt_attached: string;
  agenda_status_cancelled: string;
  agenda_status_waiting_pix: string;
  agenda_final_value: string;
  agenda_checkout_button: string;
  agenda_confirm_pix_button: string;
  agenda_view_chat: string;
  agenda_cancel_appointment_title: string;
  agenda_delete_appointment_title: string;
  agenda_delete_confirm_prefix: string;
  agenda_status_option_pending_budget: string;
  agenda_status_option_budget_sent_pix: string;
  agenda_status_option_receipt_attached: string;
  agenda_status_option_paid_confirmed: string;
  agenda_status_option_completed_checkout: string;
  agenda_status_option_cancelled: string;
  financials_header_title: string;
  financials_header_subtitle: string;
  financials_export_pdf: string;
  financials_export_excel: string;
  financials_confirmed_revenue: string;
  financials_confirmed_pix_payments: string;
  financials_pending_to_receive: string;
  financials_appointments_waiting_pix: string;
  financials_average_ticket: string;
  financials_average_per_client: string;
  financials_room_occupancy: string;
  financials_studio_capacity_used: string;
  financials_monthly_evolution: string;
  financials_service_distribution: string;
  financials_pix_entry_history: string;
  financials_table_header_datetime: string;
  financials_table_header_client: string;
  financials_table_header_service: string;
  financials_table_header_method: string;
  financials_table_header_status: string;
  financials_table_header_amount: string;
  clients_header_title: string;
  clients_header_subtitle: string;
  clients_add_new_user: string;
  clients_clear_users: string;
  clients_filter_label: string;
  clients_only_active_admin: string;
  clients_no_clients_registered: string;
  clients_database_clean_description: string;
  clients_register_new_user_artist: string;
  clients_registered_clients_list: string;
  clients_synced_via_server: string;
  clients_table_header_artist: string;
  clients_table_header_contact_cpf: string;
  clients_table_header_email: string;
  clients_table_header_phone: string;
  clients_table_header_sessions_orders: string;
  clients_table_header_action: string;
  clients_cpf_not_registered: string;
  clients_order_singular: string;
  clients_order_plural: string;
  clients_view_profile_orders: string;
  clients_show_all_data_registration: string;
  clients_export_pdf: string;
  clients_export_excel: string;
  client_profile_official_documents: string;
  client_profile_cpf: string;
  client_profile_rg: string;
  client_profile_address_location: string;
  client_profile_address: string;
  client_profile_city_cep: string;
  client_profile_artist_contacts_notes: string;
  client_profile_instagram: string;
  client_profile_notes: string;
  client_profile_session_history: string;
  client_profile_table_header_date: string;
  client_profile_table_header_service: string;
  client_profile_table_header_room: string;
  client_profile_table_header_duration: string;
  client_profile_table_header_status: string;
  client_profile_table_header_final_value: string;
  client_profile_loading_report: string;
  client_profile_status_paid_confirmed: string;
  client_profile_status_waiting_pix: string;
  client_detail_unified_profile_header: string;
  client_detail_cpf_registered: string;
  client_detail_cpf_pending: string;
  client_detail_section_registration_docs: string;
  client_detail_label_name: string;
  client_detail_label_band_project: string;
  client_detail_label_cpf_physical: string;
  client_detail_label_pix_key: string;
  client_detail_no_pin_free_access: string;
  client_detail_label_rg_document: string;
  client_detail_label_contact_email: string;
  client_detail_label_phone_whatsapp: string;
  client_detail_whatsapp: string;
  client_detail_label_billing_address: string;
  client_detail_label_instagram: string;
  client_detail_section_technical_notes: string;
  client_detail_section_service_history: string;
  client_detail_total_label: string;
  client_detail_table_header_datetime: string;
  client_detail_table_header_service_requested: string;
  client_detail_table_header_room: string;
  client_detail_table_header_duration: string;
  client_detail_table_header_instruments: string;
  client_detail_table_header_status: string;
  client_detail_table_header_value: string;
  client_detail_no_services_registered: string;
  client_detail_section_financial_entries: string;
  client_detail_financial_entries_total: string;
  client_detail_no_financial_history: string;
  client_detail_pix_confirmed: string;
  client_detail_open_communication_chat: string;
  client_detail_delete_client: string;
  client_detail_close_client_profile: string;
  delete_client_modal_title: string;
  delete_client_modal_description: string;
  delete_client_modal_confirmation: string;
  delete_client_modal_cancel: string;
  delete_client_modal_confirm_delete: string;
  undo_modal_title_rollback_yesterday: string;
  undo_modal_title_undo_today: string;
  undo_modal_title_undo_recent: string;
  undo_modal_title_restore_previous: string;
  undo_modal_subtitle: string;
  undo_modal_tab_yesterday: string;
  undo_modal_tab_today: string;
  undo_modal_tab_last_48h: string;
  undo_modal_tab_all: string;
  undo_modal_desc_yesterday: string;
  undo_modal_desc_today: string;
  undo_modal_desc_recent: string;
  undo_modal_desc_all: string;
  undo_modal_choose_action: string;
  undo_modal_action_mark_cancelled: string;
  undo_modal_action_mark_cancelled_desc: string;
  undo_modal_action_delete_permanently: string;
  undo_modal_action_delete_permanently_desc: string;
  undo_modal_back_close: string;
  create_user_modal_title: string;
  create_user_modal_subtitle: string;
  create_user_error_name_required: string;
  create_user_error_email_required: string;
  create_user_error_generic: string;
  create_user_label_full_name: string;
  create_user_label_stage_name: string;
  create_user_label_access_email: string;
  create_user_label_phone_whatsapp: string;
  create_user_label_cpf_optional: string;
  create_user_label_pin_password: string;
  create_user_pin_description: string;
  create_user_label_pix_key: string;
  create_user_label_city_region: string;
  create_user_label_internal_notes: string;
  create_user_notes_placeholder: string;
  create_user_cancel_button: string;
  create_user_submit_button: string;
  create_user_saving: string;
  create_user_success: string;
  clear_users_modal_title: string;
  clear_users_modal_description: string;
  clear_users_account_preserved: string;
  clear_users_admin_account_name: string;
  clear_users_confirmation: string;
  clear_users_cancel: string;
  clear_users_confirm_clear: string;
  clear_users_deleting: string;
  clear_users_success: string;
  quote_modal_title: string;
  quote_modal_label_total_value: string;
  quote_modal_label_discount: string;
  quote_modal_label_observations: string;
  quote_modal_final_value_pix: string;
  quote_modal_generate_and_send: string;
  ai_assistant_title: string;
  ai_assistant_subtitle: string;
  ai_assistant_label_prompt: string;
  ai_assistant_textarea_placeholder: string;
  ai_assistant_suggest_budget: string;
  ai_assistant_recording_tips: string;
  ai_assistant_response_label: string;
  ai_assistant_ai_model_label: string;
  ai_assistant_no_response: string;
  ai_assistant_connection_error: string;
  quote_default_notes: string;
  quote_notes_signal: string;
  quote_notes_official: string;
  quote_official_budget_label: string;
  month_revenue_label: string;
}

export const translations: Record<Language, Translations> = {
  pt: {
    // Navigation
    nav_schedule: 'AGENDAR',
    nav_my_orders: 'MEUS PEDIDOS',
    nav_services: 'SERVIÇOS',
    nav_gear: '& MATERIAL',
    nav_services_gear: 'SERVIÇOS & MATERIAL',
    nav_reviews: 'DEPOIMENTOS ⭐',
    nav_chat: 'CHAT',
    nav_profile: 'Meu Cadastro',
    nav_admin_agenda: 'AGENDA',
    nav_admin_clients: 'CLIENTES',
    nav_admin_finances: 'FINANÇAS',
    nav_admin_assistant: 'ASSISTENTE',
    nav_signin: 'ENTRAR',
    nav_signout: 'Sair',
    nav_admin: 'ADM',
    nav_customize: 'Personalizar',
    nav_notifications: 'Notificações',
    nav_mark_read: 'Marcar lidas',
    nav_no_notifications: 'Nenhuma notificação recente.',

    // Customization Modal
    custom_title: 'Personalização & Idioma',
    custom_subtitle: 'Ajuste o visual, as cores de destaque, a tipografia, o tamanho das fontes e o idioma do FPStudio.',
    custom_tab_language: 'Idioma / Language',
    custom_tab_accent: 'Cor de Destaque',
    custom_tab_background: 'Estilo de Fundo',
    custom_tab_font: 'Tipografia & Fonte',
    custom_tab_fontsize: 'Tamanho da Fonte',
    custom_language_title: 'Selecione o Idioma do Sistema',
    custom_language_desc: 'Alterne instantaneamente todo o sistema entre Português e Inglês.',
    custom_accent_title: 'Paleta de Cores de Destaque',
    custom_accent_desc: 'Escolha a cor primária dos botões, badges, luzes de neon e contrastes.',
    custom_bg_title: 'Ambiente & Tema do Estúdio',
    custom_bg_desc: 'Selecione a atmosfera visual e o tom de fundo da interface.',
    custom_font_title: 'Família Tipográfica',
    custom_font_desc: 'Altere a fonte de exibição para títulos, cartões e textos.',
    custom_size_title: 'Escala de Tamanho do Texto',
    custom_size_desc: 'Aumente ou diminua o tamanho das letras para maior conforto visual.',
    custom_preview_title: 'Pré-Visualização em Tempo Real',
    custom_preview_sample_heading: 'FPSTUDIO SALVADOR • GRAVAÇÃO & PRODUÇÃO',
    custom_preview_sample_text: 'Produção Musical de Alto Padrão por Fernando Padre com equipamentos profissionais.',
    custom_preview_sample_badge: 'PRO-TOOLS INCLUSO',
    custom_btn_reset: 'Restaurar Padrão',
    custom_btn_apply: 'Concluído',
    theme_mode_dark: 'Modo Escuro',
    theme_mode_light: 'Modo Claro',
    custom_mode_title: 'Modo de Luminosidade (Escuro / Claro)',
    custom_mode_desc: 'Alterne rapidamente entre o tema Noturno de Estúdio e o Modo Claro de Alta Luminosidade.',

    // Common UI
    btn_book_now: 'Agendar Sessão',
    btn_request_quote: 'Solicitar Orçamento',
    btn_cancel: 'Cancelar',
    btn_save: 'Salvar',
    btn_edit: 'Editar',
    btn_delete: 'Excluir',
    btn_close: 'Fechar',
    btn_copy: 'Copiar',
    btn_copied: 'Copiado!',
    btn_details: 'Ver Detalhes',
    btn_view_on_map: 'Ver no Mapa',

    // Statuses
    status_pending: 'Pendente',
    status_confirmed: 'Confirmado',
    status_paid: 'Pago / Aprovado',
    status_completed: 'Concluído',
    status_canceled: 'Cancelado',
    status_included: 'INCLUSO',

    // Sections
    sec_quick_booking: 'Agendamento & Simulação Rápida',
    sec_materials_title: 'MATERIAL & INSTRUMENTOS PARA GRAVAÇÃO',
    sec_materials_subtitle: 'Fotos reais, valores de uso na gravação com edição inclusa e acervo de instrumentos operados por Fernando Padre.',
    sec_services_title: 'SERVIÇOS DE PRODUÇÃO MUSICAL',
    sec_services_subtitle: 'Gravação, Edição cirúrgica, Mixagem e Masterização de alta fidelidade em Salvador - BA.',
    sec_reviews_title: 'DEPOIMENTOS & AVALIAÇÕES DE CLIENTES',
    sec_reviews_subtitle: 'O que artistas e bandas dizem sobre gravar no FPStudio.',
    sec_location_title: 'LOCALIZAÇÃO & CONTATO',

    // Producer & Studio
    producer_tagline: 'Produção Musical & Estúdio de Gravação',
    studio_location_desc: 'Travessa Dois Leões, 19 - Pernambués, Salvador - BA',

    // Common UI extended
    btn_send: 'Enviar',
    btn_send_receipt: 'Enviar comprovante',
    btn_pay_pix: 'Pagar via Pix',
    btn_new_booking: 'Novo agendamento',
    btn_reserve_first: 'Reservar 1º',
    btn_open_chat: 'Abrir chat',
    btn_review: 'Avaliar',
    btn_download_receipt: 'Baixar comprovante',
    btn_request_booking: 'Solicitar agendamento e pagamento',
    btn_register_to_book: 'Cadastrar para solicitar agendamento',
    btn_clear_selection: 'Limpar seleção',
    btn_add_included: 'Adicionar',
    btn_combo_band: 'Combo Banda Completa',
    btn_combo_forro: 'Combo Forró',
    btn_copy_key: 'Copiar chave',
    btn_save_profile: 'Salvar perfil',
    btn_register_artist: 'Cadastrar artista',
    btn_already_registered: 'Já sou cadastrado',
    btn_upload_computer: 'Do seu PC/Celular',
    btn_remove_photo: 'Remover foto',
    btn_back_home: 'Voltar ao início',
    btn_agendar: 'Agendar',
    btn_detalhes: 'Detalhes',
    btn_solicitar_agendamento: 'Solicitar agendamento',
    btn_fechar: 'Fechar',
    btn_alterar_valor_imagem: 'Alterar valor/imagem',
    btn_salvar_alteracoes: 'Salvar alterações',
    btn_confirmar_exclusao: 'Confirmar exclusão',
    btn_limpar_filtros: 'Limpar filtros',
    btn_ver_tudo: 'Ver tudo',
    btn_novo_servico: 'Novo serviço',
    btn_novo_servico_pacote: 'Novo serviço/pacote',

    // Statuses extended
    status_paid_confirmed: 'PAGO & CONFIRMADO',
    status_waiting_pix: 'AGUARDANDO PIX',
    status_receipt_review: 'EM ANÁLISE',
    status_studio_review: 'EM ANÁLISE DO ESTÚDIO',
    status_in_analysis: 'Em análise',
    status_completed_checkout: 'CONCLUÍDO',
    status_budget_sent: 'Orçamento enviado',
    status_receipt_attached: 'Comprovante anexado',

    // Sections extended
    sec_instruments: 'Instrumentos',
    sec_payment: 'Pagamento',
    sec_notes: 'Observações',
    sec_client_id: 'Dados do Cliente',
    sec_artist_id: 'Dados do Artista',
    sec_address: 'Endereço',
    sec_pix_key: 'Chave Pix',
    sec_security_pin: 'PIN de Segurança',
    sec_technical_notes: 'Observações Técnicas',
    sec_registration_docs: 'Documentos de Cadastro',
    sec_service_history: 'Histórico de Serviços',
    sec_financial_entries: 'Entradas Financeiras (Pix)',
    sec_equipment: 'Equipamentos',

    // Hero
    hero_location_badge: 'Salvador - BA',
    hero_genre_tag: 'MÚSICA BRASILEIRA',
    hero_location: 'Salvador - BA',
    hero_main_heading: 'Seu estúdio de gravação em Salvador',
    hero_subtitle: 'Gravação, edição, mixagem e masterização com padrão profissional.',
    hero_btn_instrument_budget: 'Fazer orçamento de instrumento',
    hero_btn_view_schedule: 'Ver agenda',
    hero_btn_view_map: 'Ver mapa',
    hero_producer_name: 'Fernando Padre',
    hero_producer_role: 'Produtor Musical',
    hero_feature_vocal_tuning: 'Afinação Vocal',
    hero_feature_tuning_tools: 'Melodyne, Autotune',
    hero_feature_mix_master: 'Mixagem & Masterização',
    hero_feature_streaming_ready: 'Pronto para streaming',
    hero_room_section_label: 'SALAS & AMBIENTES',
    hero_studio_name_heading: 'FPSTUDIO',
    hero_available_badge: 'DISPONÍVEL',
    hero_feature_protools: 'Pro Tools',
    hero_feature_protools_desc: 'DAW principal de gravação',
    hero_included_badge: 'INCLUSO',
    hero_feature_microphone: 'Microfones Premium',
    hero_feature_microphone_desc: 'Captação de alta fidelidade',
    hero_included_badge_2: 'INCLUSO',
    hero_feature_audio_interface: 'Interface de Áudio',
    hero_feature_audio_interface_desc: 'Conversão analógico-digital de alta qualidade',
    hero_included_badge_3: 'INCLUSO',
    hero_doubts_text: 'Ficou com dúvidas?',
    hero_studio_chat_link: 'Fale com o estúdio',
    hero_infra_badge: 'ESTÚDIO',
    hero_infra_heading: 'Estrutura e Equipamentos',
    hero_infra_desc: 'Equipamentos de última geração para gravação profissional.',

    // Tabs
    tabs_schedule: 'Agenda',
    tabs_my_bookings: 'Meus agendamentos',
    tabs_services: 'Serviços',
    tabs_services_sub: 'Serviços & Material',
    tabs_reviews: 'Avaliações',
    tabs_chat: 'Chat',
    tabs_profile_title: 'Meu Perfil',
    tabs_cpf_ok: 'CPF OK',

    // Booking
    booking_section_services_heading: 'Escolha o serviço desejado',
    booking_services_subtitle: 'Selecione o serviço que você deseja agendar.',
    booking_service_category_fallback: 'Serviço',
    booking_duration_suffix: 'horas',
    booking_studio_name: 'FPStudio',
    booking_equipment_heading: 'Equipamento + material incluso',
    booking_recording_editing_badge: 'GRAVAÇÃO & EDIÇÃO',
    booking_selected_service_label: 'Serviço selecionado',
    booking_select_service_default: 'Selecione um serviço',
    booking_session_info: 'Informações da sessão',
    booking_base_price_label: 'Valor base',
    booking_client_id_section: 'Identificação do cliente',
    booking_connected_profile_badge: 'PERFIL CONECTADO',
    booking_registration_required_badge: 'CADASTRO NECESSÁRIO',
    booking_connected_artist_text: 'Conectado como',
    booking_my_registration_btn: 'Editar meu cadastro',
    booking_login_required_heading: 'Você precisa estar conectado para agendar',
    booking_registration_instructions: 'Cadastre-se para agendar suas sessões de gravação.',
    booking_label_responsible_name: 'Nome do responsável',
    booking_placeholder_full_name: 'Digite o nome completo',
    booking_label_whatsapp_phone: 'WhatsApp / Celular',
    booking_placeholder_phone: '(00) 00000-0000',
    booking_label_artist_name: 'Nome do artista / banda',
    booking_placeholder_band_name: 'Nome artístico ou da banda',
    booking_label_email: 'E-mail',
    booking_placeholder_email: 'seuemail@exemplo.com',
    booking_label_session_date: 'Data da sessão',
    booking_label_available_times: 'Horários disponíveis',
    booking_time_slot_booked: 'Reservado',
    booking_label_track_count: 'Quantidade de faixas',
    booking_track_count_hint: 'Total de faixas do projeto',
    booking_label_reference_tracks: 'Faixas de referência (MP3)',
    booking_reference_tracks_sent: 'Faixas enviadas',
    booking_limit_reached: 'Limite atingido',
    booking_reference_tracks_hint: 'Envie até 3 faixas de referência em MP3.',
    booking_reference_track_singular: 'faixa',
    booking_reference_track_plural: 'faixas',
    booking_label_instruments_processing: 'Instrumentos usados na gravação',
    booking_instruments_subtitle: 'Selecione os instrumentos para gravação.',
    booking_category_all: 'Todos',
    booking_category_included: 'Inclusos',
    booking_category_guitars_basses: 'Guitarras & Baixos',
    booking_category_violoes_sanfona: 'Violões & Sanfona',
    booking_category_battery_percussion: 'Bateria & Percussão',
    booking_category_keyboards_strings: 'Teclados & Cordas',
    booking_category_vocals: 'Vocais',
    booking_category_protools_editing: 'Pro Tools & Edição',
    booking_included_label: 'Incluso',
    booking_label_payment_plan: 'Forma de pagamento',
    booking_payment_plan_signal: 'Sinal + Restante',
    booking_recommended_badge: 'RECOMENDADO',
    booking_payment_plan_signal_desc: 'Pague um sinal e o restante depois',
    booking_payment_plan_signal_hint: 'Sinal de 50% para confirmar',
    booking_payment_plan_full: 'Pagamento integral',
    booking_full_payment_badge: 'VALOR CHEIO',
    booking_payment_plan_full_desc: 'Pague o valor total da sessão',
    booking_payment_plan_full_hint: 'Pagamento total à vista',
    booking_label_unit_price: 'Valor unitário',
    booking_label_track_quantity: 'Quantidade',
    booking_label_total_project: 'Total do projeto',
    booking_pix_value_label: 'Valor do Pix',
    booking_pix_value_hint: 'Valor total a pagar',
    booking_pix_key_label: 'Chave Pix do estúdio',
    booking_key_copied: 'Chave copiada!',
    booking_label_project_details: 'Detalhes do projeto',
    booking_placeholder_project_notes: 'Descreva os detalhes do seu projeto',
    booking_btn_submitting: 'Enviando agendamento...',
    booking_track_singular: 'faixa',
    booking_track_plural: 'faixas',
    booking_error_select_service: 'Selecione um serviço para agendar.',
    booking_error_select_date: 'Selecione uma data para a sessão.',
    booking_error_select_time: 'Selecione um horário disponível.',
    booking_alert_invalid_audio: 'Só são aceitos arquivos de áudio.',
    booking_alert_valid_audio_only: 'Envie apenas arquivos MP3 de áudio.',
    booking_alert_track_limit_reached: 'Você atingiu o limite de faixas de referência.',
    booking_alert_duplicate_track: 'Esta faixa já foi adicionada.',
    booking_receipt_sent_message: 'enviou um comprovante de pagamento.',
    booking_track_submission_message: 'enviou uma faixa de referência.',
    booking_track_submission_single: 'Faixa de referência:',
    booking_draft_default_client_name: 'Cliente',
    booking_draft_default_band_name: 'Banda',
    booking_draft_default_room: 'Sala Principal',
    booking_receipt_attached_message: 'enviou o comprovante do Pix.',
    booking_quote_notes_official_budget: 'ORÇAMENTO OFICIAL',
    booking_quote_notes_signal: 'SINAL PARA CONFIRMAÇÃO',
    booking_quote_notes_official: 'ORÇAMENTO OFICIAL',
    booking_submitted_success: 'Agendamento enviado com sucesso!',

    // Payment Method
    payment_method_label: 'Forma de pagamento',
    payment_method_pix: 'Pix',
    payment_method_credit_card: 'Cartão de Crédito',
    payment_method_pix_desc: 'Pagamento instantâneo via Pix',
    payment_method_credit_card_desc: 'Parcele em até 12x no cartão',
    credit_card_select_brand: 'Selecione a bandeira do cartão',
    credit_card_brand_visa: 'Visa',
    credit_card_brand_mastercard: 'Mastercard',
    credit_card_brand_elo: 'Elo',
    credit_card_brand_amex: 'American Express',
    credit_card_brand_discover: 'Discover',
    credit_card_brand_diners: 'Diners Club',
    credit_card_brand_jcb: 'JCB',
    credit_card_brand_hiper: 'Hiper',
    credit_card_installments: 'Parcelas',
    credit_card_installment_singular: 'parcela',
    credit_card_installment_plural: 'parcelas',
    credit_card_holder_name: 'Nome no cartão',
    credit_card_holder_placeholder: 'Como está impresso no cartão',
    credit_card_number: 'Número do cartão',
    credit_card_number_placeholder: '0000 0000 0000 0000',
    credit_card_expiry: 'Validade',
    credit_card_expiry_placeholder: 'MM/AA',
    credit_card_cvv: 'CVV',
    credit_card_cvv_placeholder: '000',
    credit_card_installment_value: 'Valor da parcela',
    credit_card_total_value: 'Valor total',
    credit_card_confirm_payment: 'Confirmar pagamento',
    credit_card_processing: 'Processando pagamento...',
    credit_card_success_title: 'Pagamento aprovado!',
    credit_card_success_message: 'Seu pagamento foi processado com sucesso.',
    credit_card_error_title: 'Pagamento não autorizado',
    credit_card_error_message: 'Houve um problema ao processar seu pagamento. Tente novamente.',
    credit_card_secure_notice: 'Pagamento seguro e criptografado',
    credit_card_supported_brands: 'Bandeiras aceitas',

    // Bookings
    bookings_page_heading: 'Meus Agendamentos',
    bookings_page_subtitle: 'Acompanhe todos os seus agendamentos e pedidos.',
    bookings_empty_heading: 'Você ainda não tem agendamentos',
    bookings_empty_desc: 'Quando você agendar uma sessão, ela aparecerá aqui.',
    bookings_booking_code_label: 'Código do agendamento',
    bookings_status_paid_confirmed: 'Pago & Confirmado',
    bookings_status_receipt_review: 'Em análise',
    bookings_status_waiting_pix: 'Aguardando Pix',
    bookings_status_studio_review: 'Em análise do estúdio',
    bookings_label_date_time: 'Data e horário',
    bookings_label_final_value: 'Valor final',
    bookings_no_session_selected: 'Nenhuma sessão selecionada',
    bookings_review_title: 'Avaliar',

    // Chat
    chat_sidebar_heading: 'Conversas',
    chat_session_info: 'Informações da sessão',
    chat_title_attach_receipt: 'Anexar comprovante',
    chat_btn_send_receipt: 'Enviar comprovante',
    chat_btn_pay_pix: 'Pagar via Pix',
    chat_empty_heading: 'Nenhuma conversa selecionada',
    chat_empty_desc: 'Selecione uma conversa para ver as mensagens.',
    chat_btn_initial_message: 'Iniciar conversa',
    chat_quote_header: 'ORÇAMENTO',
    chat_title_copy_pix_code: 'Copiar código Pix',
    chat_copied: 'Copiado!',
    chat_btn_copy_pix: 'Copiar chave Pix',
    chat_attachment_reference: 'Faixa de referência',
    chat_attachment_receipt: 'Comprovante',
    chat_audio_unsupported: 'Seu navegador não suporta áudio.',
    chat_btn_delete_track: 'Excluir faixa',
    chat_lightbox_receipt_name: 'Comprovante de pagamento',
    chat_lightbox_zoom_hint: 'Clique para ampliar',
    chat_pending_attachment_reference: 'Faixa de referência pendente',
    chat_pending_attachment_receipt: 'Comprovante pendente',
    chat_title_remove_attachment: 'Remover anexo',
    chat_title_attach_pix_receipt: 'Anexar comprovante do Pix',
    chat_title_upload_reference: 'Enviar faixa de referência',
    chat_placeholder_music_guide: 'Anexe aqui sua faixa de referência (MP3)...',
    chat_placeholder_message: 'Digite sua mensagem...',
    chat_no_session_selected: 'Nenhuma sessão selecionada',
    chat_receipt_sent_message: 'enviou o comprovante do Pix.',
    chat_default_sender_name: 'Notificação',

    // Profile
    profile_section_client_id: 'Seus Dados',
    profile_page_heading: 'Meu Perfil',
    profile_page_desc: 'Atualize suas informações de cadastro.',
    profile_registration_status_label: 'Status do cadastro',
    profile_cpf_ok_badge: 'CPF OK',
    profile_cpf_pending_badge: 'CPF Pendente',
    profile_pix_ok_badge: 'Pix OK',
    profile_pix_undefined_badge: 'Pix não definido',
    profile_pin_active_badge: 'PIN Ativo',
    profile_success_toast_title: 'Perfil atualizado',
    profile_success_toast_badge: 'Perfil atualizado com sucesso!',
    profile_success_toast_desc: 'Seus dados foram salvos.',
    profile_success_toast_exiting: 'Saindo...',
    profile_section_artist_id: 'Dados do Artista',
    profile_section_avatar_heading: 'Foto de perfil',
    profile_avatar_desc: 'Envie uma foto para o seu perfil.',
    profile_label_full_name: 'Nome completo',
    profile_placeholder_full_name: 'Digite o nome completo',
    profile_label_band_name: 'Nome do artista / banda',
    profile_placeholder_band_name: 'Nome artístico ou da banda',
    profile_label_cpf: 'CPF',
    profile_cpf_hint: 'Apenas números',
    profile_placeholder_cpf: '000.000.000-00',
    profile_label_rg: 'RG',
    profile_placeholder_rg: 'Digite seu RG',
    profile_label_email: 'E-mail',
    profile_placeholder_email: 'seuemail@exemplo.com',
    profile_label_whatsapp_phone: 'WhatsApp / Celular',
    profile_placeholder_phone: '(00) 00000-0000',
    profile_label_instagram: 'Instagram',
    profile_placeholder_instagram: '@seuinstagram',
    profile_section_address: 'Endereço',
    profile_label_cep: 'CEP',
    profile_placeholder_cep: '00000-000',
    profile_label_full_address: 'Endereço completo',
    profile_placeholder_address: 'Rua, número, bairro',
    profile_label_city_state: 'Cidade - UF',
    profile_placeholder_city_state: 'Ex.: Salvador - BA',
    profile_section_pix_key: 'Chave Pix',
    profile_pix_key_hint: 'Informe sua chave Pix',
    profile_label_pix_key_type: 'Tipo de chave',
    profile_pix_key_type_cpf: 'CPF',
    profile_pix_key_type_email: 'E-mail',
    profile_pix_key_type_phone: 'Celular',
    profile_pix_key_type_random: 'Aleatória',
    profile_label_pix_key_value: 'Chave Pix',
    profile_placeholder_pix_cpf: '000.000.000-00',
    profile_placeholder_pix_email: 'seuemail@exemplo.com',
    profile_placeholder_pix_phone: '(00) 00000-0000',
    profile_placeholder_pix_random: 'Chave aleatória',
    profile_pix_key_desc: 'Sua chave Pix para receber pagamentos.',
    profile_section_security_pin: 'PIN de Segurança',
    profile_label_pin: 'PIN de 4 dígitos',
    profile_pin_digits_label: '4 dígitos',
    profile_placeholder_pin: '••••',
    profile_pin_desc: 'PIN para acessar seu perfil.',
    profile_section_notes: 'Observações',
    profile_placeholder_notes: 'Anotações internas (opcional)',
    profile_btn_saving: 'Salvando...',
    profile_btn_save_profile: 'Salvar perfil',

    // Modal
    modal_success_title_label: 'Agendamento confirmado!',
    modal_success_heading: 'Sessão agendada com sucesso!',
    modal_label_booking_code: 'Código do agendamento',
    modal_label_date_time: 'Data e horário',
    modal_label_service_studio: 'Serviço / Estúdio',
    modal_label_total_value: 'Valor total',
    modal_pix_value_label: 'Valor do Pix',
    modal_signal_payment_desc: 'Você pagará um sinal agora e o restante depois.',
    modal_full_payment_desc: 'Você pagará o valor total da sessão.',
    modal_official_pix_key_label: 'Chave Pix oficial',
    modal_label_beneficiary: 'Beneficiário',
    modal_label_bank: 'Banco',
    modal_label_cpf_key: 'Chave CPF',
    modal_cpf_key_copied: 'Chave copiada!',
    modal_btn_copy_cpf_key: 'Copiar chave',
    modal_copia_cola_copied: 'Copiado!',
    modal_btn_copy_pix_code: 'Copiar código',
    modal_label_beneficiary_name: 'Nome do beneficiário',
    modal_label_bank_name: 'Nome do banco',
    modal_label_cpf_key_label: 'Chave CPF',

    // EquipmentView
    section_servicos_e_valores: 'SERVIÇOS E VALORES',
    section_material_e_instrumentos: 'MATERIAL & INSTRUMENTOS',
    section_ver_tudo: 'Ver tudo',
    button_novo_servico: 'Novo serviço',
    badge_acervo_instrumentos_estudio: 'ACERVO DE INSTRUMENTOS DO ESTÚDIO',
    badge_tabela_gravacao_edicao: 'TABELA DE GRAVAÇÃO & EDIÇÃO',
    heading_material_instrumentos_gravacao: 'Material & Instrumentos para gravação',
    subheading_equipment_hero_desc: 'Explore todos os instrumentos e equipamentos disponíveis no FPStudio.',
    placeholder_search_equipment: 'Buscar instrumento ou equipamento...',
    button_adicionar_item: 'Adicionar item',
    label_valor: 'Valor',
    button_detalhes_foto_item: 'Ver detalhes/foto do item',
    tooltip_editar_item_valores: 'Editar item/valores',
    tooltip_excluir_item: 'Excluir item',
    empty_equipment_nenhum_encontrado: 'Nenhum item encontrado',
    empty_equipment_sem_resultados: 'Nenhum item corresponde à sua busca.',
    button_limpar_filtros: 'Limpar filtros',
    badge_tabela_oficial_servicos: 'TABELA OFICIAL DE SERVIÇOS',
    badge_modulo_edicao_ativo: 'MÓDULO DE EDIÇÃO ATIVO',
    heading_servicos_oferedos_valores: 'Serviços oferecidos e valores',
    subheading_servicos_lista_desc: 'Veja todos os serviços e valores do FPStudio.',
    subheading_servicos_admin_desc: 'Gerencie os serviços e valores do estúdio.',
    button_novo_servico_pacote: 'Novo serviço/pacote',
    placeholder_search_servico: 'Buscar serviço...',
    label_horas_estudio: 'horas de estúdio',
    label_horas_sessao: 'horas de estúdio',
    tooltip_editar_valores_foto_servico: 'Editar valores/foto do serviço',
    tooltip_excluir_servico: 'Excluir serviço',
    label_fpstudio_salvador: 'FPSTUDIO · SALVADOR',
    button_alterar_valor_imagem: 'Alterar valor/imagem',
    button_detalhes: 'Detalhes',
    button_agendar: 'Agendar',
    empty_servico_nenhum_encontrado: 'Nenhum serviço encontrado',
    empty_servico_sem_resultados: 'Nenhum serviço corresponde à sua busca.',
    button_limpar_filtros_servicos: 'Limpar filtros',
    label_incluso_na_sessao: 'Incluso na sessão',
    button_reduzir_foto: 'Reduzir foto',
    button_ampliar_imagem: 'Ampliar imagem',
    heading_uso_gravacao_edicao: 'Uso em gravação e edição',
    text_descricao_preco_detalhes_1: 'Incluso na sessão',
    text_descricao_preco_detalhes_2: 'Valor adicional para edição',
    heading_descricao_aplicacao_fpstudio: 'Descrição / Aplicação no FPStudio',
    heading_specifications_tech: 'Especificações técnicas',
    label_acervo_instrumentos_fpstudio: 'Acervo de Instrumentos do FPStudio',
    button_fechar: 'Fechar',
    modal_editar_item_acervo: 'Editar item do acervo',
    modal_adicionar_novo_item_acervo: 'Adicionar novo item ao acervo',
    label_titulo_instrumento_equipamento: 'Título do instrumento/equipamento',
    placeholder_ex_guitarras_eletricas: 'Ex: Guitarras Elétricas',
    label_tag_categoria: 'TAG / Categoria',
    placeholder_ex_cordas: 'Ex: cordas',
    label_tag_modelo_verd: 'TAG / Modelo (verde)',
    placeholder_ex_ibanez: 'Ex: Ibanez',
    label_valor_gravacao: 'Valor de gravação',
    placeholder_zero_para_incluso: '0 para incluso',
    text_zero_incluso_sessao: '0 = incluso na sessão',
    label_detalhes_edicao_gravacao: 'Detalhes de edição/gravação',
    placeholder_ex_gravacao_edicao: 'Ex: gravação e edição',
    label_foto_equipamento_instrumento: 'Foto do equipamento/instrumento',
    tab_do_seu_pc_celular: 'Do seu PC/Celular',
    tab_link_web_opcional: 'Link da web (opcional)',
    text_foto_carregada: 'Foto carregada',
    button_remover_foto: 'Remover foto',
    text_nenhuma_imagem_selecionada: 'Nenhuma imagem selecionada',
    button_otimizando_enviando_foto: 'Otimizando e enviando foto...',
    button_substituir_foto: 'Substituir foto',
    button_escolher_foto: 'Escolher foto',
    text_foto_salva_servidor: 'Foto salva no servidor',
    label_cole_url_imagem: 'Cole a URL da imagem',
    placeholder_descricao_equipamento: 'Descrição do equipamento',
    button_cancelar: 'Cancelar',
    button_salvar_item_acervo: 'Salvar item do acervo',
    label_foto_capa_servico: 'Foto de capa do serviço',
    tab_fotos_prontas: 'Fotos prontas',
    label_cole_link_direto: 'Cole o link direto',
    placeholder_url_imagem: 'URL da imagem',
    placeholder_explique_incluso_pacote: 'Explique o que está incluso no pacote',
    button_salvar_alteracoes: 'Salvar alterações',
    label_h_de_estudio: 'h de estúdio',
    label_valor_oficial: 'Valor oficial',
    heading_o_que_esta_incluso: 'O que está incluso',
    label_local: 'Local',
    label_duracao_estimada: 'Duração estimada',
    button_solicitar_agendamento: 'Solicitar agendamento',
    modal_excluir_servico: 'Excluir serviço',
    text_excluir_servico_desc: 'Tem certeza que deseja excluir este serviço permanentemente?',
    button_confirmar_exclusao: 'Confirmar exclusão',
    modal_confirmar_remover_item_acervo: 'Confirmar remoção do item do acervo',
    alert_imagem_nao_processada: 'A imagem ainda não foi processada.',
    alert_imagem_servico_nao_processada: 'A imagem do serviço ainda não foi processada.',
    category_todos: 'Todos',
    category_cordas: 'Cordas',
    category_percussao_bateria: 'Percussão & Bateria',
    category_instrumentos_especiais: 'Instrumentos Especiais',
    category_teclados_fx: 'Teclados & FX',
    category_daw_software: 'DAW & Software',
    category_captacao_voz: 'Captação & Voz',
    category_monitoramento: 'Monitoramento',
    category_gravacao: 'Gravação',
    category_producao_autoral: 'Produção Autoral',
    category_mix_master: 'Mix & Master',
    category_dublagem: 'Dublagem',
    label_duracao_estudio_horas: 'Duração (horas de estúdio)',
    text_tempo_estimado_gravacao_edicao: 'Tempo estimado de gravação e edição',
    label_categoria: 'Categoria',
    select_gravacao: 'Gravação',
    label_producao_autoral: 'Produção autoral',
    label_mix_master: 'Mix & Master',
    label_dublagem_vinheta: 'Dublagem / Vinheta',
    label_equip_title: 'Título',
    placeholder_equip_title: 'Digite o título do item',
    label_equip_category: 'Categoria',
    label_equip_model: 'Modelo (verde)',
    label_equip_price: 'Valor de gravação',
    label_equip_editing: 'Detalhes de edição',
    label_equip_photo: 'Foto',
    label_equip_description: 'Descrição',
    label_equip_url: 'URL da imagem',

    // ReviewsView
    hero_badge_verified_reviews: 'AVALIAÇÕES VERIFICADAS',
    hero_title_users_artists: 'Avaliações de artistas e clientes',
    hero_subtitle_description: 'Veja o que artistas e clientes dizem sobre o FPStudio.',
    btn_leave_my_review: 'Deixar minha avaliação',
    btn_schedule_my_recording: 'Agendar minha gravação',
    stats_overall_average_label: 'Média geral',
    stats_rating_scale: 'de 5',
    stats_artists_recommend: 'dos artistas recomendam',
    stats_based_on_reviews: 'com base em avaliações',
    stats_rating_distribution: 'Distribuição de notas',
    pillars_technical_highlights: 'Destaques técnicos',
    pillar_capture_quality: 'Qualidade de captação',
    pillar_microphone_acoustics: 'Microfones & acústica',
    pillar_vocal_tuning: 'Afinação vocal',
    pillar_fernando_service: 'Atendimento do Fernando',
    pillars_professional_standard: 'Padrão profissional',
    producer_panel_header: 'Painel do Produtor',
    producer_studio_location: 'FPSTUDIO · SALVADOR',
    producer_reply_hub_title: 'Central de respostas',
    producer_reply_hub_subtitle: 'Responda às avaliações dos clientes.',
    toast_producer_mode_activated: 'Modo produtor ativado',
    toast_producer_mode_deactivated: 'Modo produtor desativado',
    filter_card_total_reviews: 'Avaliações',
    filter_card_pending: 'Pendentes',
    filter_card_replied: 'Respondidas',
    search_placeholder: 'Buscar avaliações...',
    filter_tab_all: 'Todas',
    filter_tab_pending: 'Pendentes',
    filter_tab_replied: 'Respondidas',
    sort_option_recent: 'Mais recentes',
    sort_option_most_likes: 'Mais curtidas',
    sort_option_highest_rating: 'Maior nota',
    filter_category_label: 'Categoria',
    category_all_reviews: 'Todas as avaliações',
    category_production_arrangement: 'Produção & Arranjo',
    category_recording_capture: 'Gravação & Captação',
    category_editing_tuning: 'Edição & Afinação',
    category_jingles_voiceover: 'Jingles & Locução',
    empty_no_reviews_found: 'Nenhuma avaliação encontrada',
    empty_try_different_filters: 'Tente usar outros filtros ou buscas.',
    btn_clear_filters: 'Limpar filtros',
    avatar_zoom_title: 'Ampliar foto',
    badge_official_recording: 'GRAVAÇÃO OFICIAL',
    location_brand_label: 'SALVADOR',
    btn_view_hd_photo: 'Ver foto HD',
    badge_session_completed: 'SESSÃO CONCLUÍDA',
    reply_author_name: 'FPStudio',
    reply_official_producer: 'Produtor',
    zoom_subtitle_artist_client: 'Artista / Cliente',
    btn_edit_your_way: 'Editar à sua maneira',
    btn_remove_reply: 'Remover resposta',
    status_waiting_producer_reply: 'Aguardando resposta do produtor',
    btn_reply_my_way: 'Responder',
    inline_reply_producer_badge: 'PRODUTOR',
    inline_edit_reply_label: 'Editar resposta oficial',
    inline_reply_label: 'Resposta oficial',
    btn_close_inline: 'Fechar',
    tab_mode_custom_free: 'Livre',
    tab_mode_templates: 'Modelos',
    voice_listening_status: 'Ouvindo...',
    btn_voice_dictation: 'Ditado por voz',
    label_template_instruction: 'Instrução do modelo',
    label_studio_emojis: 'Emojis do estúdio',
    label_quick_snippets: 'Frases rápidas',
    label_custom_message: 'Mensagem personalizada',
    placeholder_custom_message: 'Escreva sua resposta personalizada...',
    label_preview_official_reply: 'Pré-visualização da resposta oficial',
    label_character_count: 'caracteres',
    btn_clear_text: 'Limpar texto',
    btn_publish_my_reply: 'Publicar minha resposta',
    btn_copy_review_title: 'Copiar publicação',
    btn_share: 'Compartilhar',
    btn_edit_reply: 'Editar resposta',
    btn_reply: 'Responder',
    toast_review_deleted: 'Avaliação excluída',
    btn_delete_review_title: 'Excluir avaliação',
    gallery_star_header: 'Galeria de gravações',
    gallery_recordings_made: 'Gravações realizadas no estúdio',
    gallery_click_for_hd: 'Clique para ver em HD',
    btn_leave_photo_review: 'Deixar avaliação com foto',
    badge_stars: 'estrelas',
    fallback_genre_label: 'Gênero:',
    btn_zoom_photo_gallery: 'Ampliar foto',
    lightbox_hd_photo_label: 'Foto HD',
    lightbox_artist_testimonial: 'Depoimento do artista',
    btn_lightbox_close: 'Fechar',
    lightbox_close_title: 'Fechar',
    modal_your_opinion_label: 'SUA OPINIÃO IMPORTA',
    modal_review_service_title: 'Avalie seu serviço no FPStudio',
    label_full_name: 'Nome completo',
    placeholder_full_name_example: 'Ex.: Maria Silva',
    label_band_project_name: 'Nome da banda / projeto',
    placeholder_band_project_example: 'Ex.: Banda Recôncavo',
    label_service_performed: 'Serviço realizado',
    label_track_project_title: 'Faixa / Título do projeto',
    placeholder_track_example: 'Ex.: Só Você',
    label_music_genre: 'Gênero musical',
    placeholder_genre_example: 'Ex.: Forró',
    label_session_photo: 'Foto da sessão',
    label_photo_optional_hd: 'Opcional (HD)',
    tab_source_computer: 'Computador',
    tab_source_url: 'URL',
    tab_source_presets: 'Pré-definidos',
    drag_drop_instruction: 'Arraste e solte uma imagem aqui ou clique para selecionar',
    drag_drop_formats: 'Formatos aceitos: JPG, PNG, WEBP (max 10MB)',
    btn_select_file: 'Selecionar arquivo',
    processing_image_label: 'Processando imagem...',
    url_paste_instruction: 'Cole a URL da imagem da sessão abaixo',
    preset_select_instruction: 'Escolha um dos presets abaixo',
    photo_uploaded_label: 'Foto carregada',
    preview_fullscreen_label: 'Pré-visualizar em tela cheia',
    badge_hd_1080p: 'HD 1080p',
    label_star_rating: 'Nota',
    label_comment_testimonial: 'Comentário / Depoimento',
    placeholder_comment_experience: 'Conte sua experiência no estúdio...',
    label_session_highlights: 'Destaques da sessão',
    btn_publishing: 'Publicando...',
    btn_submit_testimonial: 'Enviar avaliação',
    modal_reply_artist_title: 'Responder ao artista',
    reply_tab_mode_custom: 'Personalizado',
    reply_tab_suggestions: 'Sugestões',
    reply_voice_listening: 'Ouvindo...',
    reply_voice_dictate: 'Ditado por voz',
    reply_label_quick_reply_templates: 'Modelos de resposta rápida',
    reply_label_studio_emojis: 'Emojis do estúdio',
    reply_label_quick_phrases: 'Frases rápidas',
    reply_label_official_message: 'Mensagem oficial',
    reply_placeholder_free_text: 'Escreva sua resposta...',
    reply_label_preview_official: 'Pré-visualização da resposta oficial',
    reply_label_character_count: 'caracteres',
    reply_btn_clear: 'Limpar',
    reply_btn_remove_reply: 'Remover resposta',
    reply_btn_cancel: 'Cancelar',
    reply_btn_saving: 'Salvando...',
    reply_btn_publish_reply: 'Publicar resposta',
    toast_invalid_image_file: 'Arquivo de imagem inválido.',
    toast_failed_read_file: 'Falha ao ler o arquivo.',
    toast_review_submitted: 'Avaliação enviada com sucesso!',
    toast_save_error: 'Erro ao salvar.',
    toast_voice_not_supported: 'Seu navegador não suporta o ditado por voz.',
    toast_voice_listening: 'Ouvindo...',
    toast_speech_to_text_success: 'Fala convertida em texto.',
    toast_official_reply_published: 'Resposta oficial publicada!',
    toast_inline_reply_published: 'Resposta publicada!',
    toast_studio_reply_removed: 'Resposta do estúdio removida.',
    toast_remove_reply_error: 'Erro ao remover resposta.',
    toast_template_inserted: 'Modelo inserido.',
    toast_template_applied: 'Modelo aplicado.',
    rating_label_5: 'Excelente',
    rating_label_4: 'Muito bom',
    rating_label_3: 'Bom',
    rating_label_2: 'Regular',
    rating_label_1: 'Ruim',
    template_gratitude: 'Fico muito feliz com sua avaliação. Obrigado por escolher o FPStudio!',
    template_vocal_praise: 'Fico feliz que você gostou da afinação vocal. Foi um prazer trabalhar na sua voz.',
    template_production_instruments: 'Foi ótimo produzir com seus instrumentos. A energia foi incrível!',
    template_drums_energy: 'Fico feliz que a bateria saiu com tanta energia. Foi um prazer!',
    template_exclusive_arrangement: 'Fico feliz que você gostou do arranjo exclusivo. Foi um prazer criar!',
    snippet_tmj_bro: 'Tmj bro! 🔥',
    snippet_pressure_salvador: 'Pressão Salvador! 🔥',
    snippet_vocal_arrangement_ten: 'Vocal no arranjo! 🎤 Tá nota 10!',
    snippet_drums_punch: 'Bateria com punch! 🥁',
    snippet_pro_tools_preamps: 'Pro Tools + pré-amps! 🎛️',
    snippet_ready_platforms: 'Pronto para as plataformas! 🚀',
    snippet_fernando_brace: 'Fernando te abraça! 🤘',
    tag_pro_tools: 'Pro Tools',
    tag_excellent_acoustics: 'Acústica excelente',
    tag_fernando_ten: 'Fernando nota 10',
    tag_exclusive_arrangement: 'Arranjo exclusivo',
    tag_melodyne_tuning: 'Melodyne / Afinação',
    tag_kadosh_412: 'Kadosh 412',
    tag_maudio_board: 'Mesa M-Audio',
    tag_tomato_speakers: 'Caixas TOMATO',
    tag_drum_editing: 'Edição de bateria',
    tag_ibanez_guitars: 'Guitarras Ibanez',
    tag_six_string_bass: 'Baixo de 6 cordas',
    tag_steel_nylon_guitar: 'Violão de aço/nylon',
    tag_accordion: 'Sanfona',
    tag_commercial_jingle: 'Jingle comercial',
    tag_punctuality_coffee: 'Pontualidade & café',
    default_genre_brasilileira_pop: 'MPB',
    default_signature_label: 'Assinatura FPStudio',
    fallback_guests_artist: 'Artista',
    fallback_music_production: 'Produção Musical',
    fallback_recording_production: 'Gravação & Produção',
    fallback_genre_brasilileira: 'Música Brasileira',

    // Validation
    validation_name_required: 'O nome é obrigatório.',
    validation_email_required: 'O e-mail é obrigatório.',

    // StudioView (ADM)
    header_executive_panel_title: 'EXECUTIVE PANEL',
    header_restricted_area: 'ÁREA RESTRITA',
    header_operator_label: 'Operador',
    header_default_operator_name: 'Administrador',
    header_subtitle_description: 'Painel executivo do FPStudio',
    header_admin_settings_title: 'Configurações do ADM',
    header_change_admin_data_button: 'Dados ADM',
    header_switch_to_client_view_title: 'Alternar para visualização do cliente',
    header_view_as_client: 'Ver como cliente',
    nav_agenda: 'Agenda',
    nav_clients: 'Clientes',
    nav_services_equipment: 'Serviços & Material',
    nav_reviews_label: 'Avaliações',
    nav_financials: 'Financeiro',
    nav_ai_assistant: 'IA Assistente',
    nav_password_pin_badge: 'SENHA/PIN',
    kpi_total_summary: 'Resumo Geral',
    kpi_studio_name: 'FPSTUDIO',
    kpi_total_requests: 'Total de Pedidos',
    kpi_confirmed_revenue: 'Faturamento Confirmado',
    kpi_paid_sessions: 'Sessões Pagas',
    kpi_total_pending: 'Total Pendente',
    kpi_budgets_in_analysis: 'Orçamentos em Análise',
    kpi_pix_validation_status: 'Validação de Pix',
    kpi_pending_approval: 'Aguardando aprovação',
    kpi_all_pix_validated: 'Todos os Pix validados',
    kpi_receipts_to_validate: 'comprovantes para validar',
    chat_bookings_clients: 'Agendamentos & Clientes',
    chat_filter_all: 'Todos',
    chat_filter_receipt_sent: 'Comprovante enviado',
    chat_filter_budget_pending: 'Orçamento pendente',
    chat_filter_waiting_pix: 'Aguardando Pix',
    chat_filter_payment_confirmed: 'Pagamento confirmado',
    chat_status_confirmed: 'CONFIRMADO',
    chat_status_receipt: 'COMPROVANTE',
    chat_status_pending: 'PENDENTE',
    chat_hours_of_session: 'h de estúdio',
    chat_send_pix_budget: 'Enviar Pix/Orçamento',
    chat_confirm_pix: 'Confirmar Pix',
    chat_reference_track: 'Faixa de referência',
    chat_audio_not_supported: 'Áudio não suportado',
    chat_download_track: 'Baixar faixa',
    chat_delete: 'Excluir',
    chat_receipt_attached: 'Comprovante anexado',
    chat_receipt_pix: 'Comprovante do Pix',
    chat_click_to_zoom: 'Clique para ampliar',
    chat_approve_receipt_and_effect_pix: 'Aprovar comprovante e efetivar Pix',
    chat_quick_replies: 'Respostas rápidas',
    chat_quick_reply_budget_available: 'Orçamento disponível',
    chat_quick_reply_receipt_received: 'Comprovante recebido',
    chat_quick_reply_payment_confirmed: 'Pagamento confirmado',
    chat_placeholder_reply: 'Digite sua resposta...',
    chat_send_button: 'Enviar',
    chat_select_a_request: 'Selecione um agendamento',
    agenda_header_title: 'AGENDA DE SESSÕES',
    agenda_header_subtitle: 'Gerencie os agendamentos do estúdio',
    agenda_total_appointments: 'Total de agendamentos',
    agenda_all_requests: 'Todos os pedidos',
    agenda_confirmed_active: 'Confirmado & Ativo',
    agenda_waiting_execution: 'Aguardando Execução',
    agenda_sessions_completed_checkout: 'Sessões Concluídas (Check-out)',
    agenda_checkout_done: 'Check-out realizado',
    agenda_pending_pix: 'Aguardando Pix',
    agenda_in_analysis_budget: 'Em análise / Orçamento',
    agenda_management_rollback: 'Gerenciamento & desfazer',
    agenda_total_count: 'Total',
    agenda_rollback_description: 'Gerencie e restaure ações do dia',
    agenda_rollback_yesterday: 'Desfazer de ontem',
    agenda_undo_today: 'Desfazer de hoje',
    agenda_filter_all: 'Todos',
    agenda_filter_confirmed: 'Confirmado',
    agenda_filter_completed_checkout: 'Concluído (checkout)',
    agenda_filter_pending_pix: 'Aguardando Pix',
    agenda_filter_cancelled: 'Cancelados',
    agenda_search_placeholder: 'Buscar por cliente, banda ou serviço...',
    agenda_clear_date_title: 'Limpar data',
    agenda_clear_date_button: 'Limpar',
    agenda_no_appointments: 'Nenhum agendamento registrado',
    agenda_no_matching_sessions: 'Nenhum agendamento corresponde à sua busca.',
    agenda_reset_filters: 'Limpar filtros',
    agenda_status_session_completed: 'CONCLUÍDO',
    agenda_status_payment_confirmed: 'PAGO & CONFIRMADO',
    agenda_status_receipt_attached: 'COMPROVANTE ANEXADO',
    agenda_status_cancelled: 'CANCELADO',
    agenda_status_waiting_pix: 'AGUARDANDO PIX',
    agenda_final_value: 'Valor final',
    agenda_checkout_button: 'Check-out',
    agenda_confirm_pix_button: 'Confirmar Pix',
    agenda_view_chat: 'Ver chat',
    agenda_cancel_appointment_title: 'Cancelar agendamento',
    agenda_delete_appointment_title: 'Excluir agendamento',
    agenda_delete_confirm_prefix: 'Tem certeza que deseja excluir permanentemente este agendamento?',
    agenda_status_option_pending_budget: 'Pendente / Orçamento',
    agenda_status_option_budget_sent_pix: 'Orçamento enviado (Pix)',
    agenda_status_option_receipt_attached: 'Comprovante anexado',
    agenda_status_option_paid_confirmed: 'Pago & Confirmado',
    agenda_status_option_completed_checkout: 'Concluído (checkout)',
    agenda_status_option_cancelled: 'Cancelado',
    financials_header_title: 'FINANCEIRO',
    financials_header_subtitle: 'Acompanhe o financeiro do estúdio',
    financials_export_pdf: 'Exportar PDF',
    financials_export_excel: 'Exportar Excel',
    financials_confirmed_revenue: 'Faturamento Confirmado',
    financials_confirmed_pix_payments: 'Pagamentos Pix confirmados',
    financials_pending_to_receive: 'Pendente a receber',
    financials_appointments_waiting_pix: 'Agendamentos aguardando Pix',
    financials_average_ticket: 'Ticket médio',
    financials_average_per_client: 'Média por cliente',
    financials_room_occupancy: 'Ocupação da sala',
    financials_studio_capacity_used: 'Capacidade do estúdio utilizada',
    financials_monthly_evolution: 'Evolução mensal',
    financials_service_distribution: 'Distribuição de serviços',
    financials_pix_entry_history: 'Histórico de entradas Pix',
    financials_table_header_datetime: 'Data/Hora',
    financials_table_header_client: 'Cliente',
    financials_table_header_service: 'Serviço',
    financials_table_header_method: 'Método',
    financials_table_header_status: 'Status',
    financials_table_header_amount: 'Valor',
    clients_header_title: 'CLIENTES',
    clients_header_subtitle: 'Gerencie os clientes do estúdio',
    clients_add_new_user: 'Adicionar novo usuário',
    clients_clear_users: 'Limpar usuários',
    clients_filter_label: 'Filtrar',
    clients_only_active_admin: 'Somente admin ativo',
    clients_no_clients_registered: 'Nenhum cliente cadastrado',
    clients_database_clean_description: 'A base de clientes está limpa.',
    clients_register_new_user_artist: 'Cadastre um novo usuário/artista',
    clients_registered_clients_list: 'Lista de clientes cadastrados',
    clients_synced_via_server: 'Dados sincronizados via servidor',
    clients_table_header_artist: 'Artista',
    clients_table_header_contact_cpf: 'Contato / CPF',
    clients_table_header_email: 'E-mail',
    clients_table_header_phone: 'Telefone',
    clients_table_header_sessions_orders: 'Sessões / Pedidos',
    clients_table_header_action: 'Ação',
    clients_cpf_not_registered: 'CPF não cadastrado',
    clients_order_singular: 'pedido',
    clients_order_plural: 'pedidos',
    clients_view_profile_orders: 'Ver perfil/pedidos',
    clients_show_all_data_registration: 'Mostrar todos os dados de cadastro',
    clients_export_pdf: 'Exportar PDF',
    clients_export_excel: 'Exportar Excel',
    client_profile_official_documents: 'Documentos oficiais',
    client_profile_cpf: 'CPF',
    client_profile_rg: 'RG',
    client_profile_address_location: 'Endereço de cobrança / localização',
    client_profile_address: 'Endereço',
    client_profile_city_cep: 'Cidade / CEP',
    client_profile_artist_contacts_notes: 'Artista / Contatos / Notas',
    client_profile_instagram: 'Instagram',
    client_profile_notes: 'Notas',
    client_profile_session_history: 'Histórico de sessões',
    client_profile_table_header_date: 'Data',
    client_profile_table_header_service: 'Serviço',
    client_profile_table_header_room: 'Sala',
    client_profile_table_header_duration: 'Duração',
    client_profile_table_header_status: 'Status',
    client_profile_table_header_final_value: 'Valor final',
    client_profile_loading_report: 'Carregando relatório...',
    client_profile_status_paid_confirmed: 'PAGO & CONFIRMADO',
    client_profile_status_waiting_pix: 'AGUARDANDO PIX',
    client_detail_unified_profile_header: 'Perfil unificado do cliente',
    client_detail_cpf_registered: 'CPF Cadastrado',
    client_detail_cpf_pending: 'CPF Pendente',
    client_detail_section_registration_docs: 'Documentos de Cadastro',
    client_detail_label_name: 'Nome completo',
    client_detail_label_band_project: 'Banda / Projeto',
    client_detail_label_cpf_physical: 'CPF / Pessoa Física',
    client_detail_label_pix_key: 'Chave Pix',
    client_detail_no_pin_free_access: 'SEM PIN · ACESSO LIVRE',
    client_detail_label_rg_document: 'RG / Documento',
    client_detail_label_contact_email: 'E-mail',
    client_detail_label_phone_whatsapp: 'Telefone / WhatsApp',
    client_detail_whatsapp: 'WhatsApp',
    client_detail_label_billing_address: 'Endereço de cobrança',
    client_detail_label_instagram: 'Instagram',
    client_detail_section_technical_notes: 'Observações Técnicas',
    client_detail_section_service_history: 'Histórico de Serviços',
    client_detail_total_label: 'Total',
    client_detail_table_header_datetime: 'Data/Hora',
    client_detail_table_header_service_requested: 'Serviço solicitado',
    client_detail_table_header_room: 'Sala',
    client_detail_table_header_duration: 'Duração',
    client_detail_table_header_instruments: 'Instrumentos',
    client_detail_table_header_status: 'Status',
    client_detail_table_header_value: 'Valor',
    client_detail_no_services_registered: 'Nenhum serviço registrado',
    client_detail_section_financial_entries: 'Entradas Financeiras (Pix)',
    client_detail_financial_entries_total: 'Total Recebido (Pix)',
    client_detail_no_financial_history: 'Nenhum histórico financeiro',
    client_detail_pix_confirmed: 'Pix confirmado',
    client_detail_open_communication_chat: 'Abrir canal de comunicação (chat)',
    client_detail_delete_client: 'Excluir cliente',
    client_detail_close_client_profile: 'Fechar perfil do cliente',
    delete_client_modal_title: 'Excluir cliente',
    delete_client_modal_description: 'Esta ação irá excluir o cliente da base de dados.',
    delete_client_modal_confirmation: 'Tem certeza que deseja excluir este cliente?',
    delete_client_modal_cancel: 'Cancelar',
    delete_client_modal_confirm_delete: 'Excluir definitivamente',
    undo_modal_title_rollback_yesterday: 'Desfazer ações de ontem',
    undo_modal_title_undo_today: 'Desfazer ações de hoje',
    undo_modal_title_undo_recent: 'Desfazer ações recentes',
    undo_modal_title_restore_previous: 'Restaurar estado anterior',
    undo_modal_subtitle: 'Escolha uma ação para reverter alterações.',
    undo_modal_tab_yesterday: 'Ontem',
    undo_modal_tab_today: 'Hoje',
    undo_modal_tab_last_48h: 'Últimas 48h',
    undo_modal_tab_all: 'Todos',
    undo_modal_desc_yesterday: 'Reverter alterações feitas ontem',
    undo_modal_desc_today: 'Reverter alterações feitas hoje',
    undo_modal_desc_recent: 'Reverter alterações das últimas 48 horas',
    undo_modal_desc_all: 'Reverter todas as alterações',
    undo_modal_choose_action: 'Escolha uma ação',
    undo_modal_action_mark_cancelled: 'Marcar como cancelado',
    undo_modal_action_mark_cancelled_desc: 'Marca o agendamento como cancelado',
    undo_modal_action_delete_permanently: 'Excluir permanentemente',
    undo_modal_action_delete_permanently_desc: 'Remove o agendamento da base de dados',
    undo_modal_back_close: 'Voltar / Fechar',
    create_user_modal_title: 'Cadastrar novo usuário',
    create_user_modal_subtitle: 'Adicione um novo usuário/artista ao estúdio.',
    create_user_error_name_required: 'O nome é obrigatório.',
    create_user_error_email_required: 'O e-mail é obrigatório.',
    create_user_error_generic: 'Erro ao cadastrar o usuário.',
    create_user_label_full_name: 'Nome completo',
    create_user_label_stage_name: 'Nome artístico',
    create_user_label_access_email: 'E-mail de acesso',
    create_user_label_phone_whatsapp: 'Telefone / WhatsApp',
    create_user_label_cpf_optional: 'CPF (opcional)',
    create_user_label_pin_password: 'PIN / Senha',
    create_user_pin_description: 'PIN de 4 dígitos para acesso do cliente',
    create_user_label_pix_key: 'Chave Pix',
    create_user_label_city_region: 'Cidade / Região',
    create_user_label_internal_notes: 'Observações internas',
    create_user_notes_placeholder: 'Anotações internas (opcional)',
    create_user_cancel_button: 'Cancelar',
    create_user_submit_button: 'Cadastrar usuário',
    create_user_saving: 'Cadastrando...',
    create_user_success: 'Usuário cadastrado com sucesso!',
    clear_users_modal_title: 'Limpar usuários',
    clear_users_modal_description: 'Esta ação irá remover todos os usuários cadastrados.',
    clear_users_account_preserved: 'A conta do administrador será preservada.',
    clear_users_admin_account_name: 'Conta do administrador:',
    clear_users_confirmation: 'Tem certeza que deseja limpar a base de usuários?',
    clear_users_cancel: 'Cancelar',
    clear_users_confirm_clear: 'Limpar base',
    clear_users_deleting: 'Limpando...',
    clear_users_success: 'Base de usuários limpa com sucesso!',
    quote_modal_title: 'Enviar orçamento',
    quote_modal_label_total_value: 'Valor total',
    quote_modal_label_discount: 'Desconto',
    quote_modal_label_observations: 'Observações',
    quote_modal_final_value_pix: 'Valor final do Pix',
    quote_modal_generate_and_send: 'Gerar e enviar',
    ai_assistant_title: 'IA Assistente',
    ai_assistant_subtitle: 'Assistente virtual do estúdio',
    ai_assistant_label_prompt: 'Digite sua solicitação',
    ai_assistant_textarea_placeholder: 'Ex.: Crie um orçamento para uma banda de forró...',
    ai_assistant_suggest_budget: 'Sugerir orçamento',
    ai_assistant_recording_tips: 'Dicas de gravação',
    ai_assistant_response_label: 'Resposta',
    ai_assistant_ai_model_label: 'Modelo de IA',
    ai_assistant_no_response: 'Nenhuma resposta ainda.',
    ai_assistant_connection_error: 'Erro de conexão com a IA.',
    quote_default_notes: 'Orçamento gerado pelo estúdio',
    quote_notes_signal: 'SINAL PARA CONFIRMAÇÃO',
    quote_notes_official: 'ORÇAMENTO OFICIAL',
    quote_official_budget_label: 'ORÇAMENTO OFICIAL',
    month_revenue_label: 'Receita do mês',
  },
  en: {
    // Navigation
    nav_schedule: 'BOOK NOW',
    nav_my_orders: 'MY ORDERS',
    nav_services: 'SERVICES',
    nav_gear: '& GEAR',
    nav_services_gear: 'SERVICES & GEAR',
    nav_reviews: 'REVIEWS ⭐',
    nav_chat: 'CHAT',
    nav_profile: 'My Profile',
    nav_admin_agenda: 'SCHEDULE',
    nav_admin_clients: 'CLIENTS',
    nav_admin_finances: 'FINANCES',
    nav_admin_assistant: 'AI ASSISTANT',
    nav_signin: 'SIGN IN',
    nav_signout: 'Logout',
    nav_admin: 'ADMIN',
    nav_customize: 'Customize',
    nav_notifications: 'Notifications',
    nav_mark_read: 'Mark as read',
    nav_no_notifications: 'No recent notifications.',

    // Customization Modal
    custom_title: 'Customization & Language',
    custom_subtitle: 'Adjust appearance, accent colors, typography, font size scale, and language for FPStudio.',
    custom_tab_language: 'Language / Idioma',
    custom_tab_accent: 'Accent Color',
    custom_tab_background: 'Background Style',
    custom_tab_font: 'Typography & Font',
    custom_tab_fontsize: 'Font Size Scale',
    custom_language_title: 'Select System Language',
    custom_language_desc: 'Instantly toggle the entire interface between Portuguese and English.',
    custom_accent_title: 'Accent Color Palette',
    custom_accent_desc: 'Choose the primary neon accent color for buttons, badges, highlights, and borders.',
    custom_bg_title: 'Studio Atmosphere & Theme',
    custom_bg_desc: 'Select the background mood and deep canvas tone.',
    custom_font_title: 'Font Family',
    custom_font_desc: 'Change typography family for headings, cards, and body text.',
    custom_size_title: 'Font Size Scale',
    custom_size_desc: 'Increase or decrease text scaling for your visual comfort.',
    custom_preview_title: 'Live Preview',
    custom_preview_sample_heading: 'FPSTUDIO SALVADOR • RECORDING & PRODUCTION',
    custom_preview_sample_text: 'High-Standard Music Production by Fernando Padre with professional studio gear.',
    custom_preview_sample_badge: 'PRO-TOOLS INCLUDED',
    custom_btn_reset: 'Reset Defaults',
    custom_btn_apply: 'Done',
    theme_mode_dark: 'Dark Mode',
    theme_mode_light: 'Light Mode',
    custom_mode_title: 'Brightness Mode (Dark / Light)',
    custom_mode_desc: 'Quickly toggle between Studio Night Theme and High-Luminosity Light Mode.',

    // Common UI
    btn_book_now: 'Book Session',
    btn_request_quote: 'Request Quote',
    btn_cancel: 'Cancel',
    btn_save: 'Save',
    btn_edit: 'Edit',
    btn_delete: 'Delete',
    btn_close: 'Close',
    btn_copy: 'Copy',
    btn_copied: 'Copied!',
    btn_details: 'View Details',
    btn_view_on_map: 'View on Map',

    // Statuses
    status_pending: 'Pending',
    status_confirmed: 'Confirmed',
    status_paid: 'Paid / Approved',
    status_completed: 'Completed',
    status_canceled: 'Canceled',
    status_included: 'INCLUDED',

    // Sections
    sec_quick_booking: 'Quick Booking & Session Simulator',
    sec_materials_title: 'GEAR & INSTRUMENTS FOR RECORDING',
    sec_materials_subtitle: 'Real studio pictures, recording session rates with editing included, and instruments operated by Fernando Padre.',
    sec_services_title: 'MUSIC PRODUCTION SERVICES',
    sec_services_subtitle: 'Recording, Surgical Editing, Mixing, and Mastering high-fidelity audio in Salvador - BA.',
    sec_reviews_title: 'CLIENT REVIEWS & TESTIMONIALS',
    sec_reviews_subtitle: 'What artists, bands, and musicians say about recording at FPStudio.',
    sec_location_title: 'LOCATION & CONTACT',

    // Producer & Studio
    producer_tagline: 'Music Production & Recording Studio',
    studio_location_desc: 'Travessa Dois Leões, 19 - Pernambués, Salvador - BA',

    // Common UI extended
    btn_send: 'Send',
    btn_send_receipt: 'Send receipt',
    btn_pay_pix: 'Pay via Pix',
    btn_new_booking: 'New booking',
    btn_reserve_first: 'Reserve 1st',
    btn_open_chat: 'Open chat',
    btn_review: 'Review',
    btn_download_receipt: 'Download receipt',
    btn_request_booking: 'Request booking and payment',
    btn_register_to_book: 'Register to request booking',
    btn_clear_selection: 'Clear selection',
    btn_add_included: 'Add',
    btn_combo_band: 'Full Band Combo',
    btn_combo_forro: 'Forró Combo',
    btn_copy_key: 'Copy key',
    btn_save_profile: 'Save profile',
    btn_register_artist: 'Register artist',
    btn_already_registered: 'Already registered',
    btn_upload_computer: 'From your PC/Phone',
    btn_remove_photo: 'Remove photo',
    btn_back_home: 'Back to home',
    btn_agendar: 'Book',
    btn_detalhes: 'Details',
    btn_solicitar_agendamento: 'Request booking',
    btn_fechar: 'Close',
    btn_alterar_valor_imagem: 'Change value/image',
    btn_salvar_alteracoes: 'Save changes',
    btn_confirmar_exclusao: 'Confirm deletion',
    btn_limpar_filtros: 'Clear filters',
    btn_ver_tudo: 'View all',
    btn_novo_servico: 'New service',
    btn_novo_servico_pacote: 'New service/package',

    // Statuses extended
    status_paid_confirmed: 'PAID & CONFIRMED',
    status_waiting_pix: 'WAITING FOR PIX',
    status_receipt_review: 'UNDER REVIEW',
    status_studio_review: 'STUDIO UNDER REVIEW',
    status_in_analysis: 'Under analysis',
    status_completed_checkout: 'COMPLETED',
    status_budget_sent: 'Budget sent',
    status_receipt_attached: 'Receipt attached',

    // Sections extended
    sec_instruments: 'Instruments',
    sec_payment: 'Payment',
    sec_notes: 'Notes',
    sec_client_id: 'Client Details',
    sec_artist_id: 'Artist Details',
    sec_address: 'Address',
    sec_pix_key: 'Pix Key',
    sec_security_pin: 'Security PIN',
    sec_technical_notes: 'Technical Notes',
    sec_registration_docs: 'Registration Documents',
    sec_service_history: 'Service History',
    sec_financial_entries: 'Financial Entries (Pix)',
    sec_equipment: 'Equipment',

    // Hero
    hero_location_badge: 'Salvador - BA',
    hero_genre_tag: 'BRAZILIAN MUSIC',
    hero_location: 'Salvador - BA',
    hero_main_heading: 'Your recording studio in Salvador',
    hero_subtitle: 'Recording, editing, mixing, and mastering at a professional standard.',
    hero_btn_instrument_budget: 'Get an instrument quote',
    hero_btn_view_schedule: 'View schedule',
    hero_btn_view_map: 'View map',
    hero_producer_name: 'Fernando Padre',
    hero_producer_role: 'Music Producer',
    hero_feature_vocal_tuning: 'Vocal Tuning',
    hero_feature_tuning_tools: 'Melodyne, Autotune',
    hero_feature_mix_master: 'Mixing & Mastering',
    hero_feature_streaming_ready: 'Streaming ready',
    hero_room_section_label: 'ROOMS & SPACES',
    hero_studio_name_heading: 'FPSTUDIO',
    hero_available_badge: 'AVAILABLE',
    hero_feature_protools: 'Pro Tools',
    hero_feature_protools_desc: 'Main recording DAW',
    hero_included_badge: 'INCLUDED',
    hero_feature_microphone: 'Premium Microphones',
    hero_feature_microphone_desc: 'High-fidelity capture',
    hero_included_badge_2: 'INCLUDED',
    hero_feature_audio_interface: 'Audio Interface',
    hero_feature_audio_interface_desc: 'High-quality analog-to-digital conversion',
    hero_included_badge_3: 'INCLUDED',
    hero_doubts_text: 'Any questions?',
    hero_studio_chat_link: 'Talk to the studio',
    hero_infra_badge: 'STUDIO',
    hero_infra_heading: 'Structure and Equipment',
    hero_infra_desc: 'State-of-the-art equipment for professional recording.',

    // Tabs
    tabs_schedule: 'Schedule',
    tabs_my_bookings: 'My bookings',
    tabs_services: 'Services',
    tabs_services_sub: 'Services & Gear',
    tabs_reviews: 'Reviews',
    tabs_chat: 'Chat',
    tabs_profile_title: 'My Profile',
    tabs_cpf_ok: 'CPF OK',

    // Booking
    booking_section_services_heading: 'Choose your service',
    booking_services_subtitle: 'Select the service you want to book.',
    booking_service_category_fallback: 'Service',
    booking_duration_suffix: 'hours',
    booking_studio_name: 'FPStudio',
    booking_equipment_heading: 'Equipment + material included',
    booking_recording_editing_badge: 'RECORDING & EDITING',
    booking_selected_service_label: 'Selected service',
    booking_select_service_default: 'Select a service',
    booking_session_info: 'Session information',
    booking_base_price_label: 'Base price',
    booking_client_id_section: 'Client identification',
    booking_connected_profile_badge: 'CONNECTED PROFILE',
    booking_registration_required_badge: 'REGISTRATION REQUIRED',
    booking_connected_artist_text: 'Connected as',
    booking_my_registration_btn: 'Edit my registration',
    booking_login_required_heading: 'You need to be connected to book',
    booking_registration_instructions: 'Register to book your recording sessions.',
    booking_label_responsible_name: 'Responsible name',
    booking_placeholder_full_name: 'Enter your full name',
    booking_label_whatsapp_phone: 'WhatsApp / Phone',
    booking_placeholder_phone: '(00) 00000-0000',
    booking_label_artist_name: 'Artist / band name',
    booking_placeholder_band_name: 'Stage or band name',
    booking_label_email: 'Email',
    booking_placeholder_email: 'youremail@example.com',
    booking_label_session_date: 'Session date',
    booking_label_available_times: 'Available times',
    booking_time_slot_booked: 'Booked',
    booking_label_track_count: 'Number of tracks',
    booking_track_count_hint: 'Total tracks of the project',
    booking_label_reference_tracks: 'Reference tracks (MP3)',
    booking_reference_tracks_sent: 'Tracks sent',
    booking_limit_reached: 'Limit reached',
    booking_reference_tracks_hint: 'Send up to 3 reference tracks in MP3.',
    booking_reference_track_singular: 'track',
    booking_reference_track_plural: 'tracks',
    booking_label_instruments_processing: 'Instruments used in recording',
    booking_instruments_subtitle: 'Select the instruments for recording.',
    booking_category_all: 'All',
    booking_category_included: 'Included',
    booking_category_guitars_basses: 'Guitars & Basses',
    booking_category_violoes_sanfona: 'Acoustic Guitars & Accordion',
    booking_category_battery_percussion: 'Drums & Percussion',
    booking_category_keyboards_strings: 'Keyboards & Strings',
    booking_category_vocals: 'Vocals',
    booking_category_protools_editing: 'Pro Tools & Editing',
    booking_included_label: 'Included',
    booking_label_payment_plan: 'Payment method',
    booking_payment_plan_signal: 'Deposit + Remainder',
    booking_recommended_badge: 'RECOMMENDED',
    booking_payment_plan_signal_desc: 'Pay a deposit and the rest later',
    booking_payment_plan_signal_hint: '50% deposit to confirm',
    booking_payment_plan_full: 'Full payment',
    booking_full_payment_badge: 'FULL AMOUNT',
    booking_payment_plan_full_desc: 'Pay the full value of the session',
    booking_payment_plan_full_hint: 'Full upfront payment',
    booking_label_unit_price: 'Unit price',
    booking_label_track_quantity: 'Quantity',
    booking_label_total_project: 'Project total',
    booking_pix_value_label: 'Pix amount',
    booking_pix_value_hint: 'Total amount to pay',
    booking_pix_key_label: 'Studio Pix key',
    booking_key_copied: 'Key copied!',
    booking_label_project_details: 'Project details',
    booking_placeholder_project_notes: 'Describe the details of your project',
    booking_btn_submitting: 'Submitting booking...',
    booking_track_singular: 'track',
    booking_track_plural: 'tracks',
    booking_error_select_service: 'Select a service to book.',
    booking_error_select_date: 'Select a date for the session.',
    booking_error_select_time: 'Select an available time.',
    booking_alert_invalid_audio: 'Only audio files are accepted.',
    booking_alert_valid_audio_only: 'Only MP3 audio files.',
    booking_alert_track_limit_reached: 'You reached the reference track limit.',
    booking_alert_duplicate_track: 'This track was already added.',
    booking_receipt_sent_message: 'sent a payment receipt.',
    booking_track_submission_message: 'sent a reference track.',
    booking_track_submission_single: 'Reference track:',
    booking_draft_default_client_name: 'Client',
    booking_draft_default_band_name: 'Band',
    booking_draft_default_room: 'Main Room',
    booking_receipt_attached_message: 'sent the Pix receipt.',
    booking_quote_notes_official_budget: 'OFFICIAL BUDGET',
    booking_quote_notes_signal: 'DEPOSIT TO CONFIRM',
    booking_quote_notes_official: 'OFFICIAL BUDGET',
    booking_submitted_success: 'Booking submitted successfully!',

    // Payment Method
    payment_method_label: 'Payment method',
    payment_method_pix: 'Pix',
    payment_method_credit_card: 'Credit Card',
    payment_method_pix_desc: 'Instant payment via Pix',
    payment_method_credit_card_desc: 'Split into up to 12 installments',
    credit_card_select_brand: 'Select your card brand',
    credit_card_brand_visa: 'Visa',
    credit_card_brand_mastercard: 'Mastercard',
    credit_card_brand_elo: 'Elo',
    credit_card_brand_amex: 'American Express',
    credit_card_brand_discover: 'Discover',
    credit_card_brand_diners: 'Diners Club',
    credit_card_brand_jcb: 'JCB',
    credit_card_brand_hiper: 'Hiper',
    credit_card_installments: 'Installments',
    credit_card_installment_singular: 'installment',
    credit_card_installment_plural: 'installments',
    credit_card_holder_name: 'Cardholder name',
    credit_card_holder_placeholder: 'As printed on the card',
    credit_card_number: 'Card number',
    credit_card_number_placeholder: '0000 0000 0000 0000',
    credit_card_expiry: 'Expiration',
    credit_card_expiry_placeholder: 'MM/YY',
    credit_card_cvv: 'CVV',
    credit_card_cvv_placeholder: '000',
    credit_card_installment_value: 'Installment value',
    credit_card_total_value: 'Total value',
    credit_card_confirm_payment: 'Confirm payment',
    credit_card_processing: 'Processing payment...',
    credit_card_success_title: 'Payment approved!',
    credit_card_success_message: 'Your payment was processed successfully.',
    credit_card_error_title: 'Payment not authorized',
    credit_card_error_message: 'There was a problem processing your payment. Please try again.',
    credit_card_secure_notice: 'Secure and encrypted payment',
    credit_card_supported_brands: 'Accepted brands',

    // Bookings
    bookings_page_heading: 'My Bookings',
    bookings_page_subtitle: 'Track all your bookings and orders.',
    bookings_empty_heading: 'You have no bookings yet',
    bookings_empty_desc: 'When you book a session, it will appear here.',
    bookings_booking_code_label: 'Booking code',
    bookings_status_paid_confirmed: 'Paid & Confirmed',
    bookings_status_receipt_review: 'Under review',
    bookings_status_waiting_pix: 'Waiting for Pix',
    bookings_status_studio_review: 'Studio under review',
    bookings_label_date_time: 'Date and time',
    bookings_label_final_value: 'Final amount',
    bookings_no_session_selected: 'No session selected',
    bookings_review_title: 'Review',

    // Chat
    chat_sidebar_heading: 'Conversations',
    chat_session_info: 'Session information',
    chat_title_attach_receipt: 'Attach receipt',
    chat_btn_send_receipt: 'Send receipt',
    chat_btn_pay_pix: 'Pay via Pix',
    chat_empty_heading: 'No conversation selected',
    chat_empty_desc: 'Select a conversation to see the messages.',
    chat_btn_initial_message: 'Start conversation',
    chat_quote_header: 'QUOTE',
    chat_title_copy_pix_code: 'Copy Pix code',
    chat_copied: 'Copied!',
    chat_btn_copy_pix: 'Copy Pix key',
    chat_attachment_reference: 'Reference track',
    chat_attachment_receipt: 'Receipt',
    chat_audio_unsupported: 'Your browser does not support audio.',
    chat_btn_delete_track: 'Delete track',
    chat_lightbox_receipt_name: 'Payment receipt',
    chat_lightbox_zoom_hint: 'Click to zoom',
    chat_pending_attachment_reference: 'Pending reference track',
    chat_pending_attachment_receipt: 'Pending receipt',
    chat_title_remove_attachment: 'Remove attachment',
    chat_title_attach_pix_receipt: 'Attach Pix receipt',
    chat_title_upload_reference: 'Send reference track',
    chat_placeholder_music_guide: 'Attach your reference track here (MP3)...',
    chat_placeholder_message: 'Type your message...',
    chat_no_session_selected: 'No session selected',
    chat_receipt_sent_message: 'sent the Pix receipt.',
    chat_default_sender_name: 'Notification',

    // Profile
    profile_section_client_id: 'Your Details',
    profile_page_heading: 'My Profile',
    profile_page_desc: 'Update your registration information.',
    profile_registration_status_label: 'Registration status',
    profile_cpf_ok_badge: 'CPF OK',
    profile_cpf_pending_badge: 'CPF Pending',
    profile_pix_ok_badge: 'Pix OK',
    profile_pix_undefined_badge: 'Pix not defined',
    profile_pin_active_badge: 'PIN Active',
    profile_success_toast_title: 'Profile updated',
    profile_success_toast_badge: 'Profile updated successfully!',
    profile_success_toast_desc: 'Your data has been saved.',
    profile_success_toast_exiting: 'Signing out...',
    profile_section_artist_id: 'Artist Details',
    profile_section_avatar_heading: 'Profile photo',
    profile_avatar_desc: 'Send a photo for your profile.',
    profile_label_full_name: 'Full name',
    profile_placeholder_full_name: 'Enter your full name',
    profile_label_band_name: 'Artist / band name',
    profile_placeholder_band_name: 'Stage or band name',
    profile_label_cpf: 'CPF',
    profile_cpf_hint: 'Numbers only',
    profile_placeholder_cpf: '000.000.000-00',
    profile_label_rg: 'RG',
    profile_placeholder_rg: 'Enter your RG',
    profile_label_email: 'Email',
    profile_placeholder_email: 'youremail@example.com',
    profile_label_whatsapp_phone: 'WhatsApp / Phone',
    profile_placeholder_phone: '(00) 00000-0000',
    profile_label_instagram: 'Instagram',
    profile_placeholder_instagram: '@yourinstagram',
    profile_section_address: 'Address',
    profile_label_cep: 'ZIP code',
    profile_placeholder_cep: '00000-000',
    profile_label_full_address: 'Full address',
    profile_placeholder_address: 'Street, number, district',
    profile_label_city_state: 'City - State',
    profile_placeholder_city_state: 'Ex.: Salvador - BA',
    profile_section_pix_key: 'Pix Key',
    profile_pix_key_hint: 'Enter your Pix key',
    profile_label_pix_key_type: 'Key type',
    profile_pix_key_type_cpf: 'CPF',
    profile_pix_key_type_email: 'Email',
    profile_pix_key_type_phone: 'Phone',
    profile_pix_key_type_random: 'Random',
    profile_label_pix_key_value: 'Pix Key',
    profile_placeholder_pix_cpf: '000.000.000-00',
    profile_placeholder_pix_email: 'youremail@example.com',
    profile_placeholder_pix_phone: '(00) 00000-0000',
    profile_placeholder_pix_random: 'Random key',
    profile_pix_key_desc: 'Your Pix key to receive payments.',
    profile_section_security_pin: 'Security PIN',
    profile_label_pin: '4-digit PIN',
    profile_pin_digits_label: '4 digits',
    profile_placeholder_pin: '••••',
    profile_pin_desc: 'PIN to access your profile.',
    profile_section_notes: 'Notes',
    profile_placeholder_notes: 'Internal notes (optional)',
    profile_btn_saving: 'Saving...',
    profile_btn_save_profile: 'Save profile',

    // Modal
    modal_success_title_label: 'Booking confirmed!',
    modal_success_heading: 'Session booked successfully!',
    modal_label_booking_code: 'Booking code',
    modal_label_date_time: 'Date and time',
    modal_label_service_studio: 'Service / Studio',
    modal_label_total_value: 'Total amount',
    modal_pix_value_label: 'Pix amount',
    modal_signal_payment_desc: 'You will pay a deposit now and the rest later.',
    modal_full_payment_desc: 'You will pay the full amount of the session.',
    modal_official_pix_key_label: 'Official Pix key',
    modal_label_beneficiary: 'Beneficiary',
    modal_label_bank: 'Bank',
    modal_label_cpf_key: 'CPF key',
    modal_cpf_key_copied: 'Key copied!',
    modal_btn_copy_cpf_key: 'Copy key',
    modal_copia_cola_copied: 'Copied!',
    modal_btn_copy_pix_code: 'Copy code',
    modal_label_beneficiary_name: 'Beneficiary name',
    modal_label_bank_name: 'Bank name',
    modal_label_cpf_key_label: 'CPF key',

    // EquipmentView
    section_servicos_e_valores: 'SERVICES AND PRICES',
    section_material_e_instrumentos: 'GEAR & INSTRUMENTS',
    section_ver_tudo: 'View all',
    button_novo_servico: 'New service',
    badge_acervo_instrumentos_estudio: 'STUDIO INSTRUMENT COLLECTION',
    badge_tabela_gravacao_edicao: 'RECORDING & EDITING RATES',
    heading_material_instrumentos_gravacao: 'Gear & Instruments for recording',
    subheading_equipment_hero_desc: 'Explore all instruments and equipment available at FPStudio.',
    placeholder_search_equipment: 'Search instrument or equipment...',
    button_adicionar_item: 'Add item',
    label_valor: 'Price',
    button_detalhes_foto_item: 'View item details/photo',
    tooltip_editar_item_valores: 'Edit item/prices',
    tooltip_excluir_item: 'Delete item',
    empty_equipment_nenhum_encontrado: 'No item found',
    empty_equipment_sem_resultados: 'No item matches your search.',
    button_limpar_filtros: 'Clear filters',
    badge_tabela_oficial_servicos: 'OFFICIAL SERVICE RATES',
    badge_modulo_edicao_ativo: 'EDITING MODULE ACTIVE',
    heading_servicos_oferedos_valores: 'Services offered and prices',
    subheading_servicos_lista_desc: 'See all FPStudio services and prices.',
    subheading_servicos_admin_desc: 'Manage the studio services and prices.',
    button_novo_servico_pacote: 'New service/package',
    placeholder_search_servico: 'Search service...',
    label_horas_estudio: 'hours of studio',
    label_horas_sessao: 'hours of studio',
    tooltip_editar_valores_foto_servico: 'Edit service prices/photo',
    tooltip_excluir_servico: 'Delete service',
    label_fpstudio_salvador: 'FPSTUDIO · SALVADOR',
    button_alterar_valor_imagem: 'Change price/image',
    button_detalhes: 'Details',
    button_agendar: 'Book',
    empty_servico_nenhum_encontrado: 'No service found',
    empty_servico_sem_resultados: 'No service matches your search.',
    button_limpar_filtros_servicos: 'Clear filters',
    label_incluso_na_sessao: 'Included in the session',
    button_reduzir_foto: 'Reduce photo',
    button_ampliar_imagem: 'Enlarge image',
    heading_uso_gravacao_edicao: 'Use in recording and editing',
    text_descricao_preco_detalhes_1: 'Included in the session',
    text_descricao_preco_detalhes_2: 'Additional value for editing',
    heading_descricao_aplicacao_fpstudio: 'Description / Application at FPStudio',
    heading_specifications_tech: 'Technical specifications',
    label_acervo_instrumentos_fpstudio: 'FPStudio Instrument Collection',
    button_fechar: 'Close',
    modal_editar_item_acervo: 'Edit collection item',
    modal_adicionar_novo_item_acervo: 'Add new item to collection',
    label_titulo_instrumento_equipamento: 'Instrument/equipment title',
    placeholder_ex_guitarras_eletricas: 'Ex: Electric Guitars',
    label_tag_categoria: 'TAG / Category',
    placeholder_ex_cordas: 'Ex: strings',
    label_tag_modelo_verd: 'TAG / Model (green)',
    placeholder_ex_ibanez: 'Ex: Ibanez',
    label_valor_gravacao: 'Recording price',
    placeholder_zero_para_incluso: '0 for included',
    text_zero_incluso_sessao: '0 = included in the session',
    label_detalhes_edicao_gravacao: 'Editing/recording details',
    placeholder_ex_gravacao_edicao: 'Ex: recording and editing',
    label_foto_equipamento_instrumento: 'Equipment/instrument photo',
    tab_do_seu_pc_celular: 'From your PC/Phone',
    tab_link_web_opcional: 'Web link (optional)',
    text_foto_carregada: 'Photo uploaded',
    button_remover_foto: 'Remove photo',
    text_nenhuma_imagem_selecionada: 'No image selected',
    button_otimizando_enviando_foto: 'Optimizing and sending photo...',
    button_substituir_foto: 'Replace photo',
    button_escolher_foto: 'Choose photo',
    text_foto_salva_servidor: 'Photo saved on server',
    label_cole_url_imagem: 'Paste the image URL',
    placeholder_descricao_equipamento: 'Equipment description',
    button_cancelar: 'Cancel',
    button_salvar_item_acervo: 'Save collection item',
    label_foto_capa_servico: 'Service cover photo',
    tab_fotos_prontas: 'Ready photos',
    label_cole_link_direto: 'Paste the direct link',
    placeholder_url_imagem: 'Image URL',
    placeholder_explique_incluso_pacote: 'Explain what is included in the package',
    button_salvar_alteracoes: 'Save changes',
    label_h_de_estudio: 'h of studio',
    label_valor_oficial: 'Official price',
    heading_o_que_esta_incluso: 'What is included',
    label_local: 'Location',
    label_duracao_estimada: 'Estimated duration',
    button_solicitar_agendamento: 'Request booking',
    modal_excluir_servico: 'Delete service',
    text_excluir_servico_desc: 'Are you sure you want to permanently delete this service?',
    button_confirmar_exclusao: 'Confirm deletion',
    modal_confirmar_remover_item_acervo: 'Confirm removal of the collection item',
    alert_imagem_nao_processada: 'The image has not been processed yet.',
    alert_imagem_servico_nao_processada: 'The service image has not been processed yet.',
    category_todos: 'All',
    category_cordas: 'Strings',
    category_percussao_bateria: 'Percussion & Drums',
    category_instrumentos_especiais: 'Special Instruments',
    category_teclados_fx: 'Keyboards & FX',
    category_daw_software: 'DAW & Software',
    category_captacao_voz: 'Capture & Voice',
    category_monitoramento: 'Monitoring',
    category_gravacao: 'Recording',
    category_producao_autoral: 'Original Production',
    category_mix_master: 'Mix & Master',
    category_dublagem: 'Dubbing',
    label_duracao_estudio_horas: 'Duration (studio hours)',
    text_tempo_estimado_gravacao_edicao: 'Estimated recording and editing time',
    label_categoria: 'Category',
    select_gravacao: 'Recording',
    label_producao_autoral: 'Original production',
    label_mix_master: 'Mix & Master',
    label_dublagem_vinheta: 'Dubbing / Jingle',
    label_equip_title: 'Title',
    placeholder_equip_title: 'Enter the item title',
    label_equip_category: 'Category',
    label_equip_model: 'Model (green)',
    label_equip_price: 'Recording price',
    label_equip_editing: 'Editing details',
    label_equip_photo: 'Photo',
    label_equip_description: 'Description',
    label_equip_url: 'Image URL',

    // ReviewsView
    hero_badge_verified_reviews: 'VERIFIED REVIEWS',
    hero_title_users_artists: 'Reviews from artists and clients',
    hero_subtitle_description: 'See what artists and clients say about FPStudio.',
    btn_leave_my_review: 'Leave my review',
    btn_schedule_my_recording: 'Schedule my recording',
    stats_overall_average_label: 'Overall average',
    stats_rating_scale: 'out of 5',
    stats_artists_recommend: 'of artists recommend',
    stats_based_on_reviews: 'based on reviews',
    stats_rating_distribution: 'Rating distribution',
    pillars_technical_highlights: 'Technical highlights',
    pillar_capture_quality: 'Capture quality',
    pillar_microphone_acoustics: 'Microphones & acoustics',
    pillar_vocal_tuning: 'Vocal tuning',
    pillar_fernando_service: 'Fernando service',
    pillars_professional_standard: 'Professional standard',
    producer_panel_header: 'Producer Panel',
    producer_studio_location: 'FPSTUDIO · SALVADOR',
    producer_reply_hub_title: 'Reply hub',
    producer_reply_hub_subtitle: 'Reply to client reviews.',
    toast_producer_mode_activated: 'Producer mode activated',
    toast_producer_mode_deactivated: 'Producer mode deactivated',
    filter_card_total_reviews: 'Reviews',
    filter_card_pending: 'Pending',
    filter_card_replied: 'Replied',
    search_placeholder: 'Search reviews...',
    filter_tab_all: 'All',
    filter_tab_pending: 'Pending',
    filter_tab_replied: 'Replied',
    sort_option_recent: 'Most recent',
    sort_option_most_likes: 'Most liked',
    sort_option_highest_rating: 'Highest rating',
    filter_category_label: 'Category',
    category_all_reviews: 'All reviews',
    category_production_arrangement: 'Production & Arrangement',
    category_recording_capture: 'Recording & Capture',
    category_editing_tuning: 'Editing & Tuning',
    category_jingles_voiceover: 'Jingles & Voiceover',
    empty_no_reviews_found: 'No reviews found',
    empty_try_different_filters: 'Try different filters or searches.',
    btn_clear_filters: 'Clear filters',
    avatar_zoom_title: 'Zoom photo',
    badge_official_recording: 'OFFICIAL RECORDING',
    location_brand_label: 'SALVADOR',
    btn_view_hd_photo: 'View HD photo',
    badge_session_completed: 'SESSION COMPLETED',
    reply_author_name: 'FPStudio',
    reply_official_producer: 'Producer',
    zoom_subtitle_artist_client: 'Artist / Client',
    btn_edit_your_way: 'Edit your way',
    btn_remove_reply: 'Remove reply',
    status_waiting_producer_reply: 'Waiting for producer reply',
    btn_reply_my_way: 'Reply',
    inline_reply_producer_badge: 'PRODUCER',
    inline_edit_reply_label: 'Edit official reply',
    inline_reply_label: 'Official reply',
    btn_close_inline: 'Close',
    tab_mode_custom_free: 'Free',
    tab_mode_templates: 'Templates',
    voice_listening_status: 'Listening...',
    btn_voice_dictation: 'Voice dictation',
    label_template_instruction: 'Template instruction',
    label_studio_emojis: 'Studio emojis',
    label_quick_snippets: 'Quick phrases',
    label_custom_message: 'Custom message',
    placeholder_custom_message: 'Write your custom reply...',
    label_preview_official_reply: 'Preview of official reply',
    label_character_count: 'characters',
    btn_clear_text: 'Clear text',
    btn_publish_my_reply: 'Publish my reply',
    btn_copy_review_title: 'Copy post',
    btn_share: 'Share',
    btn_edit_reply: 'Edit reply',
    btn_reply: 'Reply',
    toast_review_deleted: 'Review deleted',
    btn_delete_review_title: 'Delete review',
    gallery_star_header: 'Recording gallery',
    gallery_recordings_made: 'Recordings made at the studio',
    gallery_click_for_hd: 'Click to view in HD',
    btn_leave_photo_review: 'Leave a review with photo',
    badge_stars: 'stars',
    fallback_genre_label: 'Genre:',
    btn_zoom_photo_gallery: 'Zoom photo',
    lightbox_hd_photo_label: 'HD photo',
    lightbox_artist_testimonial: 'Artist testimonial',
    btn_lightbox_close: 'Close',
    lightbox_close_title: 'Close',
    modal_your_opinion_label: 'YOUR OPINION MATTERS',
    modal_review_service_title: 'Review your service at FPStudio',
    label_full_name: 'Full name',
    placeholder_full_name_example: 'Ex.: Maria Silva',
    label_band_project_name: 'Band / project name',
    placeholder_band_project_example: 'Ex.: Recôncavo Band',
    label_service_performed: 'Service performed',
    label_track_project_title: 'Track / Project title',
    placeholder_track_example: 'Ex.: Só Você',
    label_music_genre: 'Music genre',
    placeholder_genre_example: 'Ex.: Forró',
    label_session_photo: 'Session photo',
    label_photo_optional_hd: 'Optional (HD)',
    tab_source_computer: 'Computer',
    tab_source_url: 'URL',
    tab_source_presets: 'Presets',
    drag_drop_instruction: 'Drag and drop an image here or click to select',
    drag_drop_formats: 'Accepted formats: JPG, PNG, WEBP (max 10MB)',
    btn_select_file: 'Select file',
    processing_image_label: 'Processing image...',
    url_paste_instruction: 'Paste the session image URL below',
    preset_select_instruction: 'Choose one of the presets below',
    photo_uploaded_label: 'Photo uploaded',
    preview_fullscreen_label: 'Preview in full screen',
    badge_hd_1080p: 'HD 1080p',
    label_star_rating: 'Rating',
    label_comment_testimonial: 'Comment / Testimonial',
    placeholder_comment_experience: 'Tell us about your experience at the studio...',
    label_session_highlights: 'Session highlights',
    btn_publishing: 'Publishing...',
    btn_submit_testimonial: 'Submit review',
    modal_reply_artist_title: 'Reply to the artist',
    reply_tab_mode_custom: 'Custom',
    reply_tab_suggestions: 'Suggestions',
    reply_voice_listening: 'Listening...',
    reply_voice_dictate: 'Voice dictation',
    reply_label_quick_reply_templates: 'Quick reply templates',
    reply_label_studio_emojis: 'Studio emojis',
    reply_label_quick_phrases: 'Quick phrases',
    reply_label_official_message: 'Official message',
    reply_placeholder_free_text: 'Write your reply...',
    reply_label_preview_official: 'Preview of the official reply',
    reply_label_character_count: 'characters',
    reply_btn_clear: 'Clear',
    reply_btn_remove_reply: 'Remove reply',
    reply_btn_cancel: 'Cancel',
    reply_btn_saving: 'Saving...',
    reply_btn_publish_reply: 'Publish reply',
    toast_invalid_image_file: 'Invalid image file.',
    toast_failed_read_file: 'Failed to read the file.',
    toast_review_submitted: 'Review submitted successfully!',
    toast_save_error: 'Error while saving.',
    toast_voice_not_supported: 'Your browser does not support voice dictation.',
    toast_voice_listening: 'Listening...',
    toast_speech_to_text_success: 'Speech converted to text.',
    toast_official_reply_published: 'Official reply published!',
    toast_inline_reply_published: 'Reply published!',
    toast_studio_reply_removed: 'Studio reply removed.',
    toast_remove_reply_error: 'Error removing reply.',
    toast_template_inserted: 'Template inserted.',
    toast_template_applied: 'Template applied.',
    rating_label_5: 'Excellent',
    rating_label_4: 'Very good',
    rating_label_3: 'Good',
    rating_label_2: 'Fair',
    rating_label_1: 'Poor',
    template_gratitude: 'I am very happy with your review. Thank you for choosing FPStudio!',
    template_vocal_praise: 'Glad you liked the vocal tuning. It was a pleasure working on your voice.',
    template_production_instruments: 'It was great producing with your instruments. The energy was incredible!',
    template_drums_energy: 'Glad the drums came out with so much energy. It was a pleasure!',
    template_exclusive_arrangement: 'Glad you liked the exclusive arrangement. It was a pleasure to create!',
    snippet_tmj_bro: 'Tmj bro! 🔥',
    snippet_pressure_salvador: 'Pressure Salvador! 🔥',
    snippet_vocal_arrangement_ten: 'Vocal on the arrangement! 🎤 Top notch!',
    snippet_drums_punch: 'Drums with punch! 🥁',
    snippet_pro_tools_preamps: 'Pro Tools + preamps! 🎛️',
    snippet_ready_platforms: 'Ready for platforms! 🚀',
    snippet_fernando_brace: 'Fernando hugs you! 🤘',
    tag_pro_tools: 'Pro Tools',
    tag_excellent_acoustics: 'Excellent acoustics',
    tag_fernando_ten: 'Fernando top notch',
    tag_exclusive_arrangement: 'Exclusive arrangement',
    tag_melodyne_tuning: 'Melodyne / Tuning',
    tag_kadosh_412: 'Kadosh 412',
    tag_maudio_board: 'M-Audio board',
    tag_tomato_speakers: 'TOMATO speakers',
    tag_drum_editing: 'Drum editing',
    tag_ibanez_guitars: 'Ibanez guitars',
    tag_six_string_bass: '6-string bass',
    tag_steel_nylon_guitar: 'Steel/nylon acoustic guitar',
    tag_accordion: 'Accordion',
    tag_commercial_jingle: 'Commercial jingle',
    tag_punctuality_coffee: 'Punctuality & coffee',
    default_genre_brasilileira_pop: 'MPB',
    default_signature_label: 'FPStudio signature',
    fallback_guests_artist: 'Artist',
    fallback_music_production: 'Music Production',
    fallback_recording_production: 'Recording & Production',
    fallback_genre_brasilileira: 'Brazilian Music',

    // Validation
    validation_name_required: 'The name is required.',
    validation_email_required: 'The email is required.',

    // StudioView (ADM)
    header_executive_panel_title: 'EXECUTIVE PANEL',
    header_restricted_area: 'RESTRICTED AREA',
    header_operator_label: 'Operator',
    header_default_operator_name: 'Administrator',
    header_subtitle_description: 'FPStudio executive panel',
    header_admin_settings_title: 'ADM Settings',
    header_change_admin_data_button: 'ADM data',
    header_switch_to_client_view_title: 'Switch to client view',
    header_view_as_client: 'View as client',
    nav_agenda: 'Schedule',
    nav_clients: 'Clients',
    nav_services_equipment: 'Services & Gear',
    nav_reviews_label: 'Reviews',
    nav_financials: 'Financials',
    nav_ai_assistant: 'AI Assistant',
    nav_password_pin_badge: 'PASSWORD/PIN',
    kpi_total_summary: 'Overall Summary',
    kpi_studio_name: 'FPSTUDIO',
    kpi_total_requests: 'Total Requests',
    kpi_confirmed_revenue: 'Confirmed Revenue',
    kpi_paid_sessions: 'Paid Sessions',
    kpi_total_pending: 'Total Pending',
    kpi_budgets_in_analysis: 'Budgets in Analysis',
    kpi_pix_validation_status: 'Pix Validation',
    kpi_pending_approval: 'Awaiting approval',
    kpi_all_pix_validated: 'All Pix validated',
    kpi_receipts_to_validate: 'receipts to validate',
    chat_bookings_clients: 'Bookings & Clients',
    chat_filter_all: 'All',
    chat_filter_receipt_sent: 'Receipt sent',
    chat_filter_budget_pending: 'Pending budget',
    chat_filter_waiting_pix: 'Waiting for Pix',
    chat_filter_payment_confirmed: 'Payment confirmed',
    chat_status_confirmed: 'CONFIRMED',
    chat_status_receipt: 'RECEIPT',
    chat_status_pending: 'PENDING',
    chat_hours_of_session: 'h of studio',
    chat_send_pix_budget: 'Send Pix/Budget',
    chat_confirm_pix: 'Confirm Pix',
    chat_reference_track: 'Reference track',
    chat_audio_not_supported: 'Audio not supported',
    chat_download_track: 'Download track',
    chat_delete: 'Delete',
    chat_receipt_attached: 'Receipt attached',
    chat_receipt_pix: 'Pix receipt',
    chat_click_to_zoom: 'Click to zoom',
    chat_approve_receipt_and_effect_pix: 'Approve receipt and effect Pix',
    chat_quick_replies: 'Quick replies',
    chat_quick_reply_budget_available: 'Budget available',
    chat_quick_reply_receipt_received: 'Receipt received',
    chat_quick_reply_payment_confirmed: 'Payment confirmed',
    chat_placeholder_reply: 'Type your reply...',
    chat_send_button: 'Send',
    chat_select_a_request: 'Select a booking',
    agenda_header_title: 'SESSION SCHEDULE',
    agenda_header_subtitle: 'Manage the studio bookings',
    agenda_total_appointments: 'Total bookings',
    agenda_all_requests: 'All requests',
    agenda_confirmed_active: 'Confirmed & Active',
    agenda_waiting_execution: 'Awaiting Execution',
    agenda_sessions_completed_checkout: 'Completed Sessions (Check-out)',
    agenda_checkout_done: 'Check-out done',
    agenda_pending_pix: 'Waiting for Pix',
    agenda_in_analysis_budget: 'In analysis / Budget',
    agenda_management_rollback: 'Management & undo',
    agenda_total_count: 'Total',
    agenda_rollback_description: 'Manage and restore day actions',
    agenda_rollback_yesterday: 'Undo from yesterday',
    agenda_undo_today: 'Undo today',
    agenda_filter_all: 'All',
    agenda_filter_confirmed: 'Confirmed',
    agenda_filter_completed_checkout: 'Completed (checkout)',
    agenda_filter_pending_pix: 'Waiting for Pix',
    agenda_filter_cancelled: 'Cancelled',
    agenda_search_placeholder: 'Search by client, band or service...',
    agenda_clear_date_title: 'Clear date',
    agenda_clear_date_button: 'Clear',
    agenda_no_appointments: 'No bookings registered',
    agenda_no_matching_sessions: 'No booking matches your search.',
    agenda_reset_filters: 'Clear filters',
    agenda_status_session_completed: 'COMPLETED',
    agenda_status_payment_confirmed: 'PAID & CONFIRMED',
    agenda_status_receipt_attached: 'RECEIPT ATTACHED',
    agenda_status_cancelled: 'CANCELLED',
    agenda_status_waiting_pix: 'WAITING FOR PIX',
    agenda_final_value: 'Final amount',
    agenda_checkout_button: 'Check-out',
    agenda_confirm_pix_button: 'Confirm Pix',
    agenda_view_chat: 'View chat',
    agenda_cancel_appointment_title: 'Cancel booking',
    agenda_delete_appointment_title: 'Delete booking',
    agenda_delete_confirm_prefix: 'Are you sure you want to permanently delete this booking?',
    agenda_status_option_pending_budget: 'Pending / Budget',
    agenda_status_option_budget_sent_pix: 'Budget sent (Pix)',
    agenda_status_option_receipt_attached: 'Receipt attached',
    agenda_status_option_paid_confirmed: 'Paid & Confirmed',
    agenda_status_option_completed_checkout: 'Completed (checkout)',
    agenda_status_option_cancelled: 'Cancelled',
    financials_header_title: 'FINANCIALS',
    financials_header_subtitle: 'Track the studio financials',
    financials_export_pdf: 'Export PDF',
    financials_export_excel: 'Export Excel',
    financials_confirmed_revenue: 'Confirmed Revenue',
    financials_confirmed_pix_payments: 'Confirmed Pix payments',
    financials_pending_to_receive: 'Pending to receive',
    financials_appointments_waiting_pix: 'Bookings waiting for Pix',
    financials_average_ticket: 'Average ticket',
    financials_average_per_client: 'Average per client',
    financials_room_occupancy: 'Room occupancy',
    financials_studio_capacity_used: 'Studio capacity used',
    financials_monthly_evolution: 'Monthly evolution',
    financials_service_distribution: 'Service distribution',
    financials_pix_entry_history: 'Pix entry history',
    financials_table_header_datetime: 'Date/Time',
    financials_table_header_client: 'Client',
    financials_table_header_service: 'Service',
    financials_table_header_method: 'Method',
    financials_table_header_status: 'Status',
    financials_table_header_amount: 'Amount',
    clients_header_title: 'CLIENTS',
    clients_header_subtitle: 'Manage the studio clients',
    clients_add_new_user: 'Add new user',
    clients_clear_users: 'Clear users',
    clients_filter_label: 'Filter',
    clients_only_active_admin: 'Only active admin',
    clients_no_clients_registered: 'No clients registered',
    clients_database_clean_description: 'The client database is clean.',
    clients_register_new_user_artist: 'Register a new user/artist',
    clients_registered_clients_list: 'List of registered clients',
    clients_synced_via_server: 'Data synced via server',
    clients_table_header_artist: 'Artist',
    clients_table_header_contact_cpf: 'Contact / CPF',
    clients_table_header_email: 'Email',
    clients_table_header_phone: 'Phone',
    clients_table_header_sessions_orders: 'Sessions / Orders',
    clients_table_header_action: 'Action',
    clients_cpf_not_registered: 'CPF not registered',
    clients_order_singular: 'order',
    clients_order_plural: 'orders',
    clients_view_profile_orders: 'View profile/orders',
    clients_show_all_data_registration: 'Show all registration data',
    clients_export_pdf: 'Export PDF',
    clients_export_excel: 'Export Excel',
    client_profile_official_documents: 'Official documents',
    client_profile_cpf: 'CPF',
    client_profile_rg: 'RG',
    client_profile_address_location: 'Billing address / location',
    client_profile_address: 'Address',
    client_profile_city_cep: 'City / ZIP',
    client_profile_artist_contacts_notes: 'Artist / Contacts / Notes',
    client_profile_instagram: 'Instagram',
    client_profile_notes: 'Notes',
    client_profile_session_history: 'Session history',
    client_profile_table_header_date: 'Date',
    client_profile_table_header_service: 'Service',
    client_profile_table_header_room: 'Room',
    client_profile_table_header_duration: 'Duration',
    client_profile_table_header_status: 'Status',
    client_profile_table_header_final_value: 'Final amount',
    client_profile_loading_report: 'Loading report...',
    client_profile_status_paid_confirmed: 'PAID & CONFIRMED',
    client_profile_status_waiting_pix: 'WAITING FOR PIX',
    client_detail_unified_profile_header: 'Unified client profile',
    client_detail_cpf_registered: 'CPF Registered',
    client_detail_cpf_pending: 'CPF Pending',
    client_detail_section_registration_docs: 'Registration Documents',
    client_detail_label_name: 'Full name',
    client_detail_label_band_project: 'Band / Project',
    client_detail_label_cpf_physical: 'CPF / Individual',
    client_detail_label_pix_key: 'Pix Key',
    client_detail_no_pin_free_access: 'NO PIN · FREE ACCESS',
    client_detail_label_rg_document: 'RG / Document',
    client_detail_label_contact_email: 'Email',
    client_detail_label_phone_whatsapp: 'Phone / WhatsApp',
    client_detail_whatsapp: 'WhatsApp',
    client_detail_label_billing_address: 'Billing address',
    client_detail_label_instagram: 'Instagram',
    client_detail_section_technical_notes: 'Technical Notes',
    client_detail_section_service_history: 'Service History',
    client_detail_total_label: 'Total',
    client_detail_table_header_datetime: 'Date/Time',
    client_detail_table_header_service_requested: 'Requested service',
    client_detail_table_header_room: 'Room',
    client_detail_table_header_duration: 'Duration',
    client_detail_table_header_instruments: 'Instruments',
    client_detail_table_header_status: 'Status',
    client_detail_table_header_value: 'Value',
    client_detail_no_services_registered: 'No services registered',
    client_detail_section_financial_entries: 'Financial Entries (Pix)',
    client_detail_financial_entries_total: 'Total Received (Pix)',
    client_detail_no_financial_history: 'No financial history',
    client_detail_pix_confirmed: 'Pix confirmed',
    client_detail_open_communication_chat: 'Open communication channel (chat)',
    client_detail_delete_client: 'Delete client',
    client_detail_close_client_profile: 'Close client profile',
    delete_client_modal_title: 'Delete client',
    delete_client_modal_description: 'This action will delete the client from the database.',
    delete_client_modal_confirmation: 'Are you sure you want to delete this client?',
    delete_client_modal_cancel: 'Cancel',
    delete_client_modal_confirm_delete: 'Delete permanently',
    undo_modal_title_rollback_yesterday: 'Undo yesterday actions',
    undo_modal_title_undo_today: 'Undo today actions',
    undo_modal_title_undo_recent: 'Undo recent actions',
    undo_modal_title_restore_previous: 'Restore previous state',
    undo_modal_subtitle: 'Choose an action to revert changes.',
    undo_modal_tab_yesterday: 'Yesterday',
    undo_modal_tab_today: 'Today',
    undo_modal_tab_last_48h: 'Last 48h',
    undo_modal_tab_all: 'All',
    undo_modal_desc_yesterday: 'Revert changes made yesterday',
    undo_modal_desc_today: 'Revert changes made today',
    undo_modal_desc_recent: 'Revert changes made in the last 48 hours',
    undo_modal_desc_all: 'Revert all changes',
    undo_modal_choose_action: 'Choose an action',
    undo_modal_action_mark_cancelled: 'Mark as cancelled',
    undo_modal_action_mark_cancelled_desc: 'Marks the booking as cancelled',
    undo_modal_action_delete_permanently: 'Delete permanently',
    undo_modal_action_delete_permanently_desc: 'Removes the booking from the database',
    undo_modal_back_close: 'Back / Close',
    create_user_modal_title: 'Register new user',
    create_user_modal_subtitle: 'Add a new user/artist to the studio.',
    create_user_error_name_required: 'The name is required.',
    create_user_error_email_required: 'The email is required.',
    create_user_error_generic: 'Error registering the user.',
    create_user_label_full_name: 'Full name',
    create_user_label_stage_name: 'Stage name',
    create_user_label_access_email: 'Access email',
    create_user_label_phone_whatsapp: 'Phone / WhatsApp',
    create_user_label_cpf_optional: 'CPF (optional)',
    create_user_label_pin_password: 'PIN / Password',
    create_user_pin_description: '4-digit PIN for client access',
    create_user_label_pix_key: 'Pix Key',
    create_user_label_city_region: 'City / Region',
    create_user_label_internal_notes: 'Internal notes',
    create_user_notes_placeholder: 'Internal notes (optional)',
    create_user_cancel_button: 'Cancel',
    create_user_submit_button: 'Register user',
    create_user_saving: 'Registering...',
    create_user_success: 'User registered successfully!',
    clear_users_modal_title: 'Clear users',
    clear_users_modal_description: 'This action will remove all registered users.',
    clear_users_account_preserved: 'The administrator account will be preserved.',
    clear_users_admin_account_name: 'Administrator account:',
    clear_users_confirmation: 'Are you sure you want to clear the user database?',
    clear_users_cancel: 'Cancel',
    clear_users_confirm_clear: 'Clear database',
    clear_users_deleting: 'Clearing...',
    clear_users_success: 'User database cleared successfully!',
    quote_modal_title: 'Send budget',
    quote_modal_label_total_value: 'Total amount',
    quote_modal_label_discount: 'Discount',
    quote_modal_label_observations: 'Observations',
    quote_modal_final_value_pix: 'Final Pix amount',
    quote_modal_generate_and_send: 'Generate and send',
    ai_assistant_title: 'AI Assistant',
    ai_assistant_subtitle: 'Studio virtual assistant',
    ai_assistant_label_prompt: 'Type your request',
    ai_assistant_textarea_placeholder: 'Ex.: Create a budget for a forró band...',
    ai_assistant_suggest_budget: 'Suggest budget',
    ai_assistant_recording_tips: 'Recording tips',
    ai_assistant_response_label: 'Response',
    ai_assistant_ai_model_label: 'AI model',
    ai_assistant_no_response: 'No response yet.',
    ai_assistant_connection_error: 'AI connection error.',
    quote_default_notes: 'Budget generated by the studio',
    quote_notes_signal: 'DEPOSIT TO CONFIRM',
    quote_notes_official: 'OFFICIAL BUDGET',
    quote_official_budget_label: 'OFFICIAL BUDGET',
    month_revenue_label: 'Month revenue',
  },
};
